export const fetchRequest = async (url, method, data) => {
    console.log(data);

  try {
      const response = await fetch(url, {
          method,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
            const result = await response.json();
            return { success: false, error: result.error };
      }

      const result = await response.json();
      return { success: true, data: result };
  } catch (error) {
      console.error('Error en fetchRequest:', error);
      return { success: false, error: error.message };
  }
};
