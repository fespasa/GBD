import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Emergency() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  // Obtener datos del triaje desde la navegación
  const triageData = location.state || {};

  const handleBackToSpecialties = () => {
    navigate('/specialties');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#dc2626',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '48px 32px',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    emergencyIcon: {
      fontSize: '80px',
      marginBottom: '24px',
      display: 'block'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#dc2626',
      marginBottom: '16px'
    },
    subtitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#374751',
      marginBottom: '32px'
    },
    description: {
      fontSize: '16px',
      color: '#6b7280',
      lineHeight: '1.6',
      marginBottom: '32px'
    },
    phoneNumber: {
      fontSize: '48px',
      fontWeight: '700',
      color: '#dc2626',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px'
    },
    phoneIcon: {
      fontSize: '48px'
    },
    instructions: {
      backgroundColor: '#fef2f2',
      border: '2px solid #fecaca',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '32px'
    },
    instructionsTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#dc2626',
      marginBottom: '12px'
    },
    instructionsList: {
      textAlign: 'left',
      color: '#374751'
    },
    instructionsItem: {
      marginBottom: '8px',
      fontSize: '14px'
    },
    backButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.emergencyIcon}>🚨</div>
        
        <h1 style={styles.title}>EMERGENCIA MÉDICA</h1>
        <h2 style={styles.subtitle}>Llame inmediatamente</h2>
        
        <div style={styles.phoneNumber}>
          <span style={styles.phoneIcon}>📞</span>
          <span>112</span>
        </div>
        
        <p style={styles.description}>
          Sus síntomas requieren atención médica inmediata. 
          No espere y llame al número de emergencias ahora mismo.
        </p>

        <div style={styles.instructions}>
          <h3 style={styles.instructionsTitle}>Instrucciones importantes:</h3>
          <ul style={styles.instructionsList}>
            <li style={styles.instructionsItem}>📱 Mantenga la calma y hable claramente</li>
            <li style={styles.instructionsItem}>📍 Proporcione su ubicación exacta</li>
            <li style={styles.instructionsItem}>🩺 Describa sus síntomas principales</li>
            <li style={styles.instructionsItem}>👥 Si es posible, tenga a alguien con usted</li>
            <li style={styles.instructionsItem}>🚪 Mantenga las puertas desbloqueadas para los paramédicos</li>
          </ul>
        </div>

        <button
          onClick={handleBackToSpecialties}
          style={styles.backButton}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Volver a especialidades
        </button>
      </div>
    </div>
  );
}

export default Emergency;