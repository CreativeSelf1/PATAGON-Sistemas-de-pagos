import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useNewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Hook para la redirección
  const IP =  import.meta.env.VITE_SERVERIP;

  const recoverPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${IP}/recoveryPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), 
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Correo de recuperación enviado');
        setTimeout(() => {
          navigate('/');  
        }, 3000);  
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Error de red, por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return { recoverPassword, loading, error, success };
};

export default useNewPassword;
