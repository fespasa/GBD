import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function ContactOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Obtener datos del triaje o formulario
  const previousData = location.state || {};
  const { specialty, triageResult, formData, type } = previousData;

  const validatePhone = (phoneNumber) => {
    if (!phoneNumber.trim()) {
      return 'Por favor, ingrese su número de teléfono';
    }
    if (!/^\d{9,}$/.test(phoneNumber.replace(/\s/g, ''))) {
      return 'Por favor, ingrese un número de teléfono válido (mínimo 9 dígitos)';
    }
    return '';
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (phoneError) {
      setPhoneError('');
    }
  };

  const handleWaitForCall = () => {
    let finalPhone = phone;
    
    // Si viene de salud mental, usar el teléfono del formulario
    if (type === 'mental-health-form' && formData?.phone) {
      finalPhone = formData.phone;
    }
    
    const error = validatePhone(finalPhone);
    if (error) {
      setPhoneError(error);
      return;
    }

    // Navegar a página de espera
    navigate('/wait-for-call', {
      state: {
        specialty: specialty,
        phone: finalPhone,
        triageResult: triageResult,
        formData: formData,
        type: type
      }
    });
  };

  const handleScheduleCall = () => {
    let finalPhone = phone;
    
    // Si viene de salud mental, usar el teléfono del formulario
    if (type === 'mental-health-form' && formData?.phone) {
      finalPhone = formData.phone;
    }
    
    const error = validatePhone(finalPhone);
    if (error) {
      setPhoneError(error);
      return;
    }

    // Navegar a página de programación
    navigate('/schedule-call', {
      state: {
        specialty: specialty,
        phone: finalPhone,
        triageResult: triageResult,
        formData: formData,
        type: type
      }
    });
  };

  const getTitle = () => {
    if (type === 'mental-health-form') {
      return 'Consulta de Salud Mental';
    }
    return triageResult?.classification || 'Consulta Médica';
  };

  const getDescription = () => {
    if (type === 'mental-health-form') {
      return 'Hemos recibido su consulta de salud mental. Elija cómo prefiere que nos pongamos en contacto con usted:';
    }
    return `Según su evaluación, necesita: ${triageResult?.destination || 'Atención médica'}. Elija cómo prefiere continuar:`;
  };

  const showPhoneInput = type !== 'mental-health-form';

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
      padding: '32px 16px'
    },
    card: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '32px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '16px',
      textAlign: 'center'
    },
    description: {
      color: '#6b7280',
      marginBottom: '32px',
      textAlign: 'center',
      lineHeight: '1.5'
    },
    phoneSection: {
      marginBottom: '32px',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      border: '2px solid #e5e7eb'
    },
    phoneLabel: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#374751',
      marginBottom: '8px'
    },
    phoneInput: {
      width: '100%',
      padding: '12px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px'
    },
    phoneError: {
      color: '#dc2626',
      fontSize: '14px',
      marginTop: '4px'
    },
    phoneHint: {
      color: '#6b7280',
      fontSize: '14px',
      marginTop: '4px'
    },
    optionsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    optionCard: {
      padding: '24px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: 'white'
    },
    optionIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    optionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '8px'
    },
    optionDescription: {
      color: '#6b7280',
      marginBottom: '16px',
      lineHeight: '1.5'
    },
    optionTime: {
      fontSize: '14px',
      color: '#17ab9c',
      fontWeight: '600'
    },
    backButton: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      padding: '12px 24px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'block',
      margin: '0 auto'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>{getTitle()}</h1>
        <p style={styles.headerSubtitle}>Opciones de contacto médico</p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>¿Cómo prefiere continuar?</h2>
          <p style={styles.description}>{getDescription()}</p>

          {showPhoneInput && (
            <div style={styles.phoneSection}>
              <label style={styles.phoneLabel}>Número de teléfono para contacto</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="Ej: 612345678"
                style={{
                  ...styles.phoneInput,
                  ...(phoneError ? { borderColor: '#dc2626' } : {})
                }}
              />
              {phoneError && <div style={styles.phoneError}>{phoneError}</div>}
              <div style={styles.phoneHint}>
                Número donde podamos contactarle
              </div>
            </div>
          )}

          <div style={styles.optionsContainer}>
            <div
              style={styles.optionCard}
              onClick={handleWaitForCall}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#17ab9c';
                e.currentTarget.style.backgroundColor = '#f0fdfa';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={styles.optionIcon}>📞</div>
              <h3 style={styles.optionTitle}>Llamada Urgente</h3>
              <p style={styles.optionDescription}>
                Un profesional médico le llamará lo más pronto posible. 
                Mantenga su teléfono disponible.
              </p>
              <div style={styles.optionTime}>Llamada en los próximos minutos</div>
            </div>

            <div
              style={styles.optionCard}
              onClick={handleScheduleCall}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#17ab9c';
                e.currentTarget.style.backgroundColor = '#f0fdfa';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={styles.optionIcon}>📅</div>
              <h3 style={styles.optionTitle}>Programar Videollamada</h3>
              <p style={styles.optionDescription}>
                Elija una hora conveniente para una videollamada con un profesional médico.
              </p>
              <div style={styles.optionTime}>Horarios disponibles hoy y mañana</div>
            </div>
          </div>

          <button
            onClick={() => navigate('/specialties')}
            style={styles.backButton}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f9fafb';
              e.target.style.borderColor = '#d1d5db';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#e5e7eb';
            }}
          >
            ← Volver a especialidades
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactOptions;