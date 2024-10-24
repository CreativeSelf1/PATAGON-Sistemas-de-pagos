import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import MenuDashboard from '../../public/Components/menuDashboard/menuDashboard';
import styles from '../styles/requests.module.css';
import styles1 from '../styles/DashboardGeneral.module.css';
import Card from '../../public/Components/RequestCard/Card';
import refreshAccessToken from '../../public/Components/RefreshToken';
import logo from '../assets/SoloLogo_Patagon.png';

const Solicitudes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [filter, setFilter] = useState('pendiente');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Cambia esto al número que desees
  const ipserver = import.meta.env.VITE_IP;
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`http://${ipserver}:${port}/api/command/requests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 403) {
          return refreshAccessToken().then(newToken => {
            return fetch(`http://${ipserver}:${port}/api/command/users`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newToken}` 
              }
            });
          });
        }

        if (!response.ok) {
          throw new Error('Error en la red al obtener las solicitudes');
        }

        const data = await response.json();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reinicia a la primera página cuando cambia el filtro
  }, [filter]);

  const updateSolicitudes = (updatedSolicitud) => {
    setSolicitudes(prevSolicitudes => 
      prevSolicitudes.map(solicitud => 
        solicitud.ID_request === updatedSolicitud.ID_request ? updatedSolicitud : solicitud
      )
    );
  };

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    XLSX.writeFile(workbook, 'Solicitudes.xlsx');
  };

  const handleExport = () => {
    exportToExcel(solicitudes);
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    switch (filter) {
      case 'pendiente':
        return solicitud.estado === 'pendiente';
      case 'aceptado':
        return solicitud.estado === 'aceptado';
      case 'rechazado':
        return solicitud.estado === 'rechazado';
      default:
        return true;
    }
  });

  // Paginación
  const indexOfLastSolicitud = currentPage * itemsPerPage;
  const indexOfFirstSolicitud = indexOfLastSolicitud - itemsPerPage;
  const currentSolicitudes = filteredSolicitudes.slice(indexOfFirstSolicitud, indexOfLastSolicitud);
  const totalPages = Math.ceil(filteredSolicitudes.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles1.dashboardContainer}>
      <MenuDashboard toggleMenu={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <main className={`${styles1.content} ${isOpen ? styles1.open : ''}`}>
        <div className={styles1.header}>
          <div className={styles1.titleLogo}>
            <img src={logo} className={styles1.menuIcon} />
            <h1>Dashboard Solicitudes</h1>
          </div>
        </div>
        <div className={styles.filterButtons}>
          <button className={filter === 'pendiente' ? styles.active : ''} onClick={() => setFilter('pendiente')}>Pendientes</button>
          <button className={filter === 'aceptado' ? styles.active : ''} onClick={() => setFilter('aceptado')}>Aceptadas</button>
          <button className={filter === 'rechazado' ? styles.active : ''} onClick={() => setFilter('rechazado')}>Rechazadas</button>
        </div>
        <button className={styles.excel} onClick={handleExport}>
          <img src="/icons/excel-icon.svg" alt="Exportar" />
          Exportar
        </button>

        <div className={styles.solicitudesList}>
          {currentSolicitudes.length > 0 ? (
            currentSolicitudes.map((solicitud, index) => {
              const delay = `${index * 100}ms`;
              return (
                <Card key={solicitud.ID_request} solicitud={solicitud} updateSolicitudes={updateSolicitudes} delay={delay} />
              );
            })
          ) : (
            <p>No hay solicitudes disponibles.</p>
          )}
        </div>

        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
      </main>
    </div>
  );
};

export default Solicitudes;
