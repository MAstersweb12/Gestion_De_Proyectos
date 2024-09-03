const express = require('express');
const cors = require('cors');  // Importa el paquete cors
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Habilita CORS
app.use(cors());

// Configura bodyParser
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'databasest.cnk4akum61hq.us-east-2.rds.amazonaws.com',
  user: 'root',
  password: 'sfabri2003',
  database: 'Crear_Cuenta'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Ruta para crear una nueva cuenta
app.post('/api/create-account', (req, res) => {
  const { email, fullname, password } = req.body;

  // Primero, verifica si el correo electrónico ya está registrado
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Error al verificar el correo electrónico:', err);
      res.status(500).send('Error al verificar el correo electrónico');
      return;
    }

    if (results.length > 0) {
      // Correo electrónico ya registrado
      res.status(400).json('El correo electrónico ya está registrado');
      return;
    }

    // Si el correo no está registrado, inserta el nuevo usuario
    const insertQuery = 'INSERT INTO users (email, fullname, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [email, fullname, password], (err, result) => {
      if (err) {
        console.error('Error al crear la cuenta:', err);
        res.status(500).send('Error al crear la cuenta');
        return;
      }
      res.status(201).send('Cuenta creada exitosamente');
    });
  });
});

// Ruta para verificar inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Consulta para buscar al usuario en la base de datos
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error al verificar el usuario:', err);
      res.status(500).send('Error del servidor');
      return;
    }

    if (results.length === 0) {
      // No se encontró el usuario
      res.status(404).send('No existe un usuario registrado con ese correo');
    } else {
      const user = results[0];

      if (user.password === password) {
        // El inicio de sesión es exitoso
        res.status(200).send('Inicio de sesión exitoso');
      } else {
        // La contraseña no coincide
        res.status(401).send('Contraseña incorrecta');
      }
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});







