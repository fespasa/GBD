import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function AdvisorWait() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();
  const [waitTime, setWaitTime] = useState(0);
  const [queuePosition, setQueuePosition] = useState(3);

  const reason = location.state?.reason || 'Consulta general';

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Simular tiempo de espera que va aumentando
    const timer = setInterval(() => {
      setWaitTime(prev => prev + 1);
    }, 1000);

    // Simular avance en la cola cada 30 segundos
    const queueTimer = setInterval(() => {
      setQueuePosition(prev => {
        if (prev <= 1) {
          // Simular que es su turno después de 90 segundos
          clearInterval(queueTimer);
          setTimeout(() => {
            navigate('/video-call', { 
              state: { 
                isAdvisorCall: true,
                reason: reason,
                doctorName: 'Asesor María García'
              } 
            });
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 30000); // Cada 30 segundos

    return () => {
      clearInterval(timer);
      clearInterval(queueTimer);
    };
  }, [user, navigate, reason]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
    waitCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #17ab9c',
      padding: '3rem 2rem',
      marginBottom: '2rem'
    },
    icon: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      animation: 'pulse 2s infinite'
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
    queueInfo: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '2rem'
    },
    queueNumber: {
      fontSize: '3rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '0.5rem'
    },
    queueText: {
      color: '#666666',
      fontSize: '1rem',
      marginBottom: '1rem'
    },
    timeInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    },
    timeLabel: {
      color: '#666666',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    timeValue: {
      color: '#17ab9c',
      fontSize: '1rem',
      fontWeight: '700'
    },
    reasonInfo: {
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '1rem'
    },
    reasonLabel: {
      color: '#666666',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    reasonText: {
      color: '#17ab9c',
      fontSize: '1rem',
      fontWeight: '600'
    },
    actions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      color: '#666666',
      border: '2px solid #e0e0e0',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    scheduleButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer'
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.waitCard}>
          <div style={styles.icon}>⏳</div>
          <h1 style={styles.title}>En cola de espera</h1>
          <p style={styles.subtitle}>
            Estás esperando para ser atendido por uno de nuestros asesores especializados.
          </p>

          <div style={styles.queueInfo}>
            {queuePosition > 0 ? (
              <>
                <div style={styles.queueNumber}>{queuePosition}</div>
                <div style={styles.queueText}>
                  {queuePosition === 1 ? 'Eres el siguiente!' : `personas delante de ti`}
                </div>
              </>
            ) : (
              <>
                <div style={styles.queueNumber}>🎉</div>
                <div style={styles.queueText}>
                  ¡Es tu turno! Iniciando videollamada...
                </div>
              </>
            )}

            <div style={styles.timeInfo}>
              <span style={styles.timeLabel}>Tiempo esperando:</span>
              <span style={styles.timeValue}>{formatTime(waitTime)}</span>
            </div>

            <div style={styles.reasonInfo}>
              <div style={styles.reasonLabel}>Motivo de consulta:</div>
              <div style={styles.reasonText}>{reason}</div>
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.cancelButton}
            onClick={() => navigate('/specialty-selection')}
          >
            Cancelar espera
          </button>
          
          <button
            style={styles.scheduleButton}
            onClick={() => navigate('/schedule-advisor-call', { 
              state: { 
                reason: reason,
                type: 'scheduled'
              } 
            })}
          >
            Programar cita
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
}

export default AdvisorWait;