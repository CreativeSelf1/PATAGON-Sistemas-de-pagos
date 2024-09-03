import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data', 'requests.json'); // Ubicación del archivo JSON

export const getPatagonData = (req, res) => {
    try {
        console.log("Patagon");
        res.status(200).send("patagon"); 
    } catch (error) {
        console.error("Error:", error);  
        res.status(500).send("Internal Server Error");  
    }
};



export const getSolicitudes = (req, res) => {
    try {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    return res.status(200).json([]);
                } else {
                    console.error("Error al leer el archivo:", err);
                    return res.status(500).send("Error al procesar la solicitud");
                }
            }
            try {
                const requests = JSON.parse(data);
                res.status(200).json(requests);
            } catch (parseError) {
                console.error("Error al parsear el archivo JSON:", parseError);
                res.status(500).send("Error al procesar la solicitud");
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error de solicitud");
    }
};

// Manejo de solicitudes entrantes (POST)
export const addRequest = (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { email, name } = req.body;

        // Valida los datos recibidos
        if (!email || !name) {
            return res.status(400).send("Faltan datos requeridos: correo o nombre");
        }

        // Datos de la solicitud
        const requestData = { email, name, timestamp: new Date().toISOString() };

        // Lee el archivo existente y agrega los nuevos datos
        fs.readFile(filePath, 'utf8', (err, data) => {
            let requests = [];

            if (err && err.code === 'ENOENT') {
                // Archivo no existe, se crea uno nuevo
                requests = [];
            } else if (err) {
                // Manejo de errores de lectura del archivo
                console.error("Error al leer el archivo:", err);
                return res.status(500).send("Error al procesar la solicitud");
            } else {
                try {
                    requests = JSON.parse(data);
                } catch (parseError) {
                    console.error("Error al parsear el archivo JSON:", parseError);
                    return res.status(500).send("Error al procesar la solicitud");
                }
            }

            // Agrega la nueva solicitud a la lista
            requests.push(requestData);

            // Guarda los datos actualizados en el archivo JSON
            fs.writeFile(filePath, JSON.stringify(requests, null, 2), 'utf8', (writeError) => {
                if (writeError) {
                    console.error("Error al escribir en el archivo:", writeError);
                    return res.status(500).send("Error al procesar la solicitud");
                }

                console.log("Solicitud guardada:", requestData);
                res.status(200).send("Solicitud de usuario recibida");
            });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error de solicitud");
    }
};
