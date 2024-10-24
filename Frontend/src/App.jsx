import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Registro from './Pages/Registro';
import Dashboard from './Pages/Dashboard';
import Dashboard_solicitudes from './Pages/Dashboard_solicitudes';
import Dashboard_user from './Pages/Dashboard_user';
import Dashboard_profit from './Pages/Dashboard_profit';
import Dashboard_config from './Pages/Dashboard_config';
import NotFound from './Pages/NotFound';
import Solicitudes from './Pages/Solicitudes';
import ProtectedRoute from '../public/Components/ProtectedRoute';
import RetornoPage from './Pages/PurchaseReturn';
import DashboardLayout from '../public/Components/notificaciones/DashboardLayout'
import Purchase_details from './Pages/Purchase_details';
import Dashboard_admin from './Pages/Dashboard_admin';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas con el nuevo layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-profit" element={
          <ProtectedRoute>
            <Dashboard_profit />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-config" element={
          <ProtectedRoute>
            <Dashboard_config />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-user" element={<Dashboard_user />} />
        <Route path="/dashboard-solicitudes" element={
          <ProtectedRoute>
            <Solicitudes />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard-compra/:id" element={
          <ProtectedRoute>
            <Purchase_details />
          </ProtectedRoute>
        } />

        <Route path="/retorno" element={<RetornoPage />} />
        <Route path="/dashboard-admin" element={
          <ProtectedRoute>
            <Dashboard_admin />
          </ProtectedRoute>
        } />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Cualquier otra ruta redirige a 404 */}
      </Routes>
    </Router>
  );
}

export default App;
