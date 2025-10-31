import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function AdvisorScheduled() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();
  
  const { reason, date, time, notes, advisor } = location.state || {};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '2rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center'
    },
    successCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #17ab9c',
      padding: '3rem 2rem',
      marginBottom: '2rem'
    },
    successIcon: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      color: '#17ab9c'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '1rem'
    },
    subtitle: {
      color: '#666666',
      fontSize: '1.125rem',
      marginBottom: '2rem',
      lineHeight: '1.5'
    },
    appointmentDetails: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'left',
      marginBottom: '2rem'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 0',
      borderBottom: '1px solid #e0e0e0'
    },
    detailRowLast: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 0'
    },
    detailLabel: {
      color: '#666666',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    detailValue: {
      color: '#17ab9c',
      fontSize: '0.875rem',
      fontWeight: '700',
      textAlign: 'right',
      maxWidth: '60%'
    },
    notesSection: {
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '1rem',
      textAlign: 'left'
    },
    notesLabel: {
      color: '#666666',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    notesText: {
      color: '#17ab9c',
      fontSize: '0.875rem',
      lineHeight: '1.4'
    },
    actions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    primaryButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      minWidth: '150px'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#17ab9c',
      border: '2px solid #17ab9c',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      minWidth: '150px'
    },
    reminderBox: {
      backgroundColor: '#fff7ed',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '1.5rem',
      border: '1px solid #fed7aa'
    },
    reminderText: {
      color: '#9a3412',
      fontSize: '0.875rem',
      lineHeight: '1.4'
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  if (!date || !time) {
    navigate('/specialty-selection');
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✅</div>
          <h1 style={styles.title}>¡Cita programada!</h1>
          <p style={styles.subtitle}>
            Tu videollamada con nuestro asesor ha sido programada exitosamente.
          </p>

          <div style={styles.appointmentDetails}>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Fecha:</span>
              <span style={styles.detailValue}>{formatDate(date)}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Hora:</span>
              <span style={styles.detailValue}>{time}</span>
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Asesor:</span>
              <span style={styles.detailValue}>{advisor}</span>
            </div>
            
            <div style={styles.detailRowLast}>
              <span style={styles.detailLabel}>Motivo:</span>
              <span style={styles.detailValue}>{reason}</span>
            </div>

            {notes && (
              <div style={styles.notesSection}>
                <div style={styles.notesLabel}>Información adicional:</div>
                <div style={styles.notesText}>{notes}</div>
              </div>
            )}
          </div>

          <div style={styles.reminderBox}>
            <div style={styles.reminderText}>
              📧 Te hemos enviado un email de confirmación con todos los detalles. 
              Recibirás un recordatorio 15 minutos antes de la cita.
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.primaryButton}
            onClick={() => navigate('/appointments')}
          >
            Ver mis citas
          </button>
          
          <button
            style={styles.secondaryButton}
            onClick={() => navigate('/specialty-selection')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvisorScheduled;