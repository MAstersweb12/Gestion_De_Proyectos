import React, { useState } from 'react';
import './Dashboard.css'; // Asegúrate de tener un archivo CSS con los estilos correspondientes

// Componentes de las funcionalidades
import TaskManagement from './TaskManagement';
import Calendar from './Calendar';
import Reports from './Reports';
import Configuration from './Configuration';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard'); // Para controlar la sección activa

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'tasks':
        return <TaskManagement />;
      case 'calendar':
        return <Calendar />;
      case 'reports':
        return <Reports />;
      case 'configuration':
        return <Configuration />;
      default:
        return (
          <main className="dashboard-main">
            <h2>Bienvenido al Dashboard</h2>
            <p>Selecciona una opción del menú para empezar.</p>
          </main>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Gestión de Proyecto</h1>
      </header>
      <nav className="dashboard-sidebar">
        <ul>
          <li><a href="#" onClick={() => setActiveSection('tasks')}>Tareas</a></li>
          <li><a href="#" onClick={() => setActiveSection('calendar')}>Calendario</a></li>
          <li><a href="#" onClick={() => setActiveSection('reports')}>Reportes</a></li>
          <li><a href="#" onClick={() => setActiveSection('configuration')}>Configuración</a></li>
        </ul>
      </nav>
      {renderActiveSection()}
    </div>
  );
}

export default Dashboard;
