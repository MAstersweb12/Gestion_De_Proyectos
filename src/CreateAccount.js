import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css'; 

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Cuenta creada exitosamente');
        navigate('/'); // Navegar de vuelta a la página de inicio de sesión
      } else {
        const errorText = await response.text();
        alert(errorText); // Mostrar el mensaje de error del backend
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un problema al crear la cuenta');
    }
  };

  return (
    <div className="create-account-container">
      <h1>Crear una Cuenta Nueva</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electrónico:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="fullname">Nombre Completo:</label>
        <input 
          type="text" 
          id="fullname" 
          name="fullname" 
          value={formData.fullname} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="password">Contraseña:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />

        <input type="submit" value="Crear Cuenta" />
      </form>
    </div>
  );
}

export default CreateAccount;
