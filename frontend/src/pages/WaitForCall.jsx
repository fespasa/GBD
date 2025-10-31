import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function WaitForCall() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();
  const [waitTime, setWaitTime] = useState('');
  const [dots, setDots] = useState('');

  // Obtener datos del contacto
  const contactData = location.state || {};
  const { specialty, phone, triageResult, formData, type } = contactData;

  useEffect(() => {
    // Generar tiempo de espera estimado
    const estimatedMinutes = Math.floor(Math.random() * 10) + 5; // Entre 5-15 minutos
    setWaitTime(`${estimatedMinutes} minutos`);
  }, []);

  useEffect(() => {
    // Animación de puntos
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleSimulateCall = () => {
    // Simular que llega la llamada - navegar a videollamada
    navigate('/video-call', {
      state: {
        specialty: specialty,
        phone: phone,
        triageResult: triageResult,
        formData: formData,
        type: type,
        callType: 'urgent'
      }
    });
  };

  const handleScheduleInstead = () => {
    // Cambiar de opinión y programar llamada
    navigate('/schedule-call', {
      state: {
        specialty: specialty,
        phone: phone,
        triageResult: triageResult,
        formData: formData,
        type: type
      }
    });
  };

  const getTitle = () => {
    if (type === 'mental-health-form') {
      return 'Esperando Consulta de Salud Mental';
    }
    return 'Esperando Llamada Médica';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#17ab9c'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px'
    },
    headerTitle: {
      margin: 0,
      color: '#111827',
      fontSize: '20px',
      fontWeight: '600'
    },
    headerSubtitle: {
      margin: '8px 0 0 0',
      color: '#6b7280',
      fontSize: '14px'
    },
    content: {
      padding: '32px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 80px)'
    },
    card: {
      maxWidth: '600px',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '48px 32px',
      textAlign: 'center'
    },
    icon: {
      fontSize: '80px',
      marginBottom: '24px',
      animation: 'pulse 2s infinite'
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '16px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#17ab9c',
      fontWeight: '600',
      marginBottom: '24px'
    },
    description: {
      color: '#6b7280',
      marginBottom: '32px',
      lineHeight: '1.6'
    },
    phoneInfo: {
      backgroundColor: '#f0fdfa',
      border: '2px solid #5eead4',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '32px'
    },
    phoneLabel: {
      fontSize: '14px',
      color: '#0f766e',
      fontWeight: '600',
      marginBottom: '8px'
    },
    phoneNumber: {
      fontSize: '24px',
      color: '#17ab9c',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    waitingAnimation: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontSize: '18px',
      color: '#17ab9c',
      fontWeight: '600',
      marginBottom: '32px'
    },
    estimatedTime: {
      backgroundColor: '#fef3c7',
      border: '2px solid #fbbf24',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '32px',
      color: '#92400e',
      fontSize: '16px',
      fontWeight: '600'
    },
    instructions: {
      backgroundColor: '#f9fafb',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '32px',
      textAlign: 'left'
    },
    instructionsTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#374751',
      marginBottom: '12px'
    },
    instructionsList: {
      color: '#6b7280',
      fontSize: '14px'
    },
    instructionsItem: {
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center'
    },
    simulateButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      padding: '16px 32px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    scheduleButton: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      padding: '12px 24px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    backButton: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>{getTitle()}</h1>
        <p style={styles.headerSubtitle}>Un profesional le contactará pronto</p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.icon}>📞</div>
          
          <h2 style={styles.title}>Preparando su llamada</h2>
          <h3 style={styles.subtitle}>Un profesional médico le llamará pronto</h3>
          
          <div style={styles.waitingAnimation}>
            <span>Conectando</span>
            <span>{dots}</span>
          </div>

          {waitTime && (
            <div style={styles.estimatedTime}>
              ⏱️ Tiempo estimado de espera: {waitTime}
            </div>
          )}

          <p style={styles.description}>
            Hemos recibido su solicitud. Un profesional médico especializado 
            le llamará al número proporcionado en los próximos minutos.
          </p>

          <div style={styles.phoneInfo}>
            <div style={styles.phoneLabel}>Llamaremos al número:</div>
            <div style={styles.phoneNumber}>
              📱 {phone || formData?.phone}
            </div>
          </div>

          <div style={styles.instructions}>
            <h4 style={styles.instructionsTitle}>Mientras espera:</h4>
            <ul style={styles.instructionsList}>
              <li style={styles.instructionsItem}>
                <span>📱</span>
                <span>Mantenga su teléfono cerca y con volumen alto</span>
              </li>
              <li style={styles.instructionsItem}>
                <span>📋</span>
                <span>Tenga a mano su historia médica y medicamentos actuales</span>
              </li>
              <li style={styles.instructionsItem}>
                <span>🏠</span>
                <span>Busque un lugar tranquilo y privado para la conversación</span>
              </li>
              <li style={styles.instructionsItem}>
                <span>📝</span>
                <span>Prepare papel y bolígrafo para tomar notas</span>
              </li>
            </ul>
          </div>

          <div style={styles.buttonContainer}>
            {/* Botón para simular que llega la llamada - solo para demo */}
            <button
              onClick={handleSimulateCall}
              style={styles.simulateButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0f9f93'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#17ab9c'}
            >
              🎭 Simular llamada entrante (Demo)
            </button>

            <button
              onClick={handleScheduleInstead}
              style={styles.scheduleButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.borderColor = '#d1d5db';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#e5e7eb';
              }}
            >
              Prefiero programar una videollamada
            </button>

            <button
              onClick={() => navigate('/specialties')}
              style={styles.backButton}
            >
              ← Volver a especialidades
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default WaitForCall;