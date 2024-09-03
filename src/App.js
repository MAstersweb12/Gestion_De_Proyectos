import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css'; // Asegúrate de que el archivo CSS esté en su lugar

import Dashboard from './Dashboard';
import CreateAccount from './CreateAccount'; // Importa el nuevo componente de creación de cuenta

function App() {
  useEffect(() => {
    // Crear el elemento de enlace para Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Crear y añadir estilos
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: 'Roboto', sans-serif;
        background: linear-gradient(135deg, #6A11CB, #2575FC);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        color: #ffffff;
      }
      .login-container {
        background-color: rgba(255, 255, 255, 0.1);
        background-image: url('images/bit_masters.png'); /* Asegúrate de tener esta imagen en 'public/images/' */
        background-size: 100px;
        background-repeat: no-repeat;
        background-position: center top;
        padding: 5rem 2rem 2rem 2rem;
        border-radius: 8px;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 400px;
        text-align: center;
      }
      h1, h2 {
        text-align: center;
        color: #ffffff;
        margin-bottom: 1.5rem;
      }
      .login-container label {
        font-weight: bold;
        color: #e0e0e0;
      }
      .login-container input[type="text"],
      .login-container input[type="password"] {
        width: 100%;
        padding: 0.75rem;
        margin: 0.5rem 0 1.25rem 0;
        border: 1px solid #dddddd;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.2);
        color: #ffffff;
      }
      .login-container input[type="submit"] {
        width: 100%;
        padding: 0.75rem;
        background-color: #6A11CB;
        border: none;
        border-radius: 4px;
        color: #ffffff;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .login-container input[type="submit"]:hover {
        background-color: #4b0ba6;
      }
      .login-container .forgot-password {
        text-align: center;
        margin-top: 1rem;
      }
      .login-container .forgot-password a {
        color: #FF6F61;
        text-decoration: none;
        font-weight: bold;
      }
      .login-container .forgot-password a:hover {
        text-decoration: underline;
      }
      .create-account {
        margin-top: 2rem;
        text-align: center;
      }
      .create-account a {
        color: #ffffff;
        text-decoration: none;
        font-weight: bold;
      }
      .create-account a:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-account" element={<CreateAccount />} /> {/* Nueva ruta para crear cuenta */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        navigate('/dashboard');
      } else if (response.status === 404) {
        alert('No existe un usuario registrado con ese correo');
      } else if (response.status === 401) {
        alert('Contraseña incorrecta');
      } else {
        alert('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un problema al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electrónico:</label>
        <input type="text" id="email" name="email" value={credentials.email} onChange={handleChange} required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />

        <input type="submit" value="Iniciar Sesión" />
      </form>

      <div className="forgot-password">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>

      <div className="create-account">
        <h2>¿No tienes cuenta?</h2>
        <a href="#" onClick={() => navigate('/create-account')}>Crear una cuenta</a>
      </div>
    </div>
  );
}


export default App;
