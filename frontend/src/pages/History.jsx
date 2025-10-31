import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function History() {
  const navigate = useNavigate();
  const { user } = useApp();

  // Datos de ejemplo para la demo
  const historyItems = [
    {
      id: 1,
      date: '2024-10-25',
      time: '09:30',
      action: 'Registro en la aplicación',
      details: 'Primer acceso a Global Doctors',
      type: 'account',
      icon: '👤'
    },
    {
      id: 2,
      date: '2024-10-25',
      time: '09:35',
      action: 'Perfil completado',
      details: 'Datos médicos básicos añadidos',
      type: 'profile',
      icon: '📝'
    },
    {
      id: 3,
      date: '2024-10-20',
      time: '14:20',
      action: 'Consulta médica',
      details: 'Triaje completado - Medicina General',
      type: 'consultation',
      icon: '🩺'
    },
    {
      id: 4,
      date: '2024-10-20',
      time: '14:45',
      action: 'Videollamada finalizada',
      details: 'Consulta con Dr. María González - 15 min',
      type: 'video_call',
      icon: '📹'
    },
    {
      id: 5,
      date: '2024-09-15',
      time: '11:10',
      action: 'Consulta especializada',
      details: 'Triaje completado - Cardiología',
      type: 'consultation',
      icon: '❤️'
    },
    {
      id: 6,
      date: '2024-09-15',
      time: '11:30',
      action: 'Informe descargado',
      details: 'Electrocardiograma - Dr. Carlos Martín',
      type: 'download',
      icon: '📄'
    }
  ];

  const getTypeColor = (type) => {
    // Todos los tipos usan el mismo color para mantener consistencia
    return '#17ab9c';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '2rem 1rem'
    },
    content: {
      maxWidth: '64rem',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#17ab9c',
      margin: 0
    },
    backButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600'
    },
    timeline: {
      position: 'relative',
      paddingLeft: '2rem'
    },
    timelineLine: {
      position: 'absolute',
      left: '1rem',
      top: '0',
      bottom: '0',
      width: '2px',
      backgroundColor: '#e5e7eb'
    },
    historyItem: {
      position: 'relative',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    timelineDot: {
      position: 'absolute',
      left: '-1.75rem',
      top: '1.5rem',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      border: '3px solid white',
      boxShadow: '0 0 0 2px currentColor'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.75rem'
    },
    itemIcon: {
      fontSize: '1.5rem',
      marginRight: '0.5rem'
    },
    itemTitle: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827'
    },
    itemDateTime: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    itemDetails: {
      fontSize: '0.95rem',
      color: '#374151',
      lineHeight: '1.4'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '0.25rem'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: '500'
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>📋 Historial de la App</h1>
          <button
            style={styles.backButton}
            onClick={() => navigate('/specialty-selection')}
          >
            ← Volver
          </button>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>6</div>
            <div style={styles.statLabel}>Actividades Totales</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>3</div>
            <div style={styles.statLabel}>Consultas Realizadas</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>2</div>
            <div style={styles.statLabel}>Videollamadas</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>1</div>
            <div style={styles.statLabel}>Informes Descargados</div>
          </div>
        </div>

        <div style={styles.timeline}>
          <div style={styles.timelineLine}></div>
          
          {historyItems.map((item) => (
            <div key={item.id} style={styles.historyItem}>
              <div 
                style={{
                  ...styles.timelineDot,
                  color: getTypeColor(item.type)
                }}
              ></div>
              
              <div style={styles.itemHeader}>
                <div style={styles.itemTitle}>
                  <span style={styles.itemIcon}>{item.icon}</span>
                  {item.action}
                </div>
                <div style={styles.itemDateTime}>
                  {new Date(item.date).toLocaleDateString('es-ES')} • {item.time}
                </div>
              </div>
              
              <div style={styles.itemDetails}>
                {item.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;