import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { jwtDecode } from 'jwt-decode';

const useForm = (initialData) => {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado de carga

  const apiKey = import.meta.env.VITE_API_KEY;
  const port = import.meta.env.VITE_PORT;
  const ipserver = import.meta.env.VITE_IP;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.email = form.email.toLowerCase();
    const jsonString = JSON.stringify(form);
    console.log(jsonString); 
    setLoading(true);
    fetch(`http://${ipserver}:${port}/api/command/login`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      method: 'POST',
      body: jsonString,
      
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        setErrors({ server: data.error });
        setLoading(false);
      } else {
        if (data.token) {
          // Guardar el token en localStorage
          localStorage.setItem('refreshToken',data.refreshToken);
          localStorage.setItem('token', data.token);
          const decodedToken = jwtDecode(data.token);
          // console.log(decodedToken);
          if(decodedToken.rol == 'Administrador' || decodedToken.rol == 'Co-admin'){
            navigate('/dashboard');
          }
          if(decodedToken.rol == 'Revisor'){
            navigate('/admin/dashboard-requests');
          }  
          if(decodedToken.rol == 'Cliente'){
            navigate('/mainClient');
          }
        }
      setLoading(false);
      }
    })
    .catch((error) => {
      console.error('Error:',error);
      setErrors({ server: 'Error en la solicitud: ' + error.message });
      setLoading(false);
    });
  }

  return { form, errors, loading, handleChange, handleSubmit };
}

export default useForm;