import React, { useEffect } from 'react';
import { toast, Toaster } from 'sonner'; //npm install sonner
import { io } from 'socket.io-client';
import styles from '../styles/Notifications_Sonner.module.css'; 
const Notifications = () => {
  const port = import.meta.env.VITE_PORT;
  useEffect(() => {
    const socket = io(`http://localhost:${port}`);

    socket.emit('joinAdmin', 'admin');

    socket.on('newNotification', (message) => {
      toast(message, {
        className: styles.toast, // Aplicar el estilo modular a la notificación
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Notifications;
