import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function AdvisorConsultation() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const consultationReasons = [
    {
      id: 'insurance',
      title: 'Seguros médicos',
      description: 'Información sobre pólizas, coberturas y tramitación',
      icon: '🛡️'
    },
    {
      id: 'appointments',
      title: 'Gestión de citas',
      description: 'Programar, modificar o cancelar citas médicas',
      icon: '📅'
    },
    {
      id: 'billing',
      title: 'Facturación',
      description: 'Consultas sobre facturas, pagos y reembolsos',
      icon: '💳'
    },
    {
      id: 'services',
      title: 'Información de servicios',
      description: 'Detalles sobre especialidades y tratamientos',
      icon: '📋'
    },
    {
      id: 'technical',
      title: 'Soporte técnico',
      description: 'Problemas con la app o videollamadas',
      icon: '🔧'
    },
    {
      id: 'other',
      title: 'Otro motivo',
      description: 'Especifica tu consulta personalizada',
      icon: '💬'
    }
  ];

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    if (reason.id === 'other') {
      // No mostrar opciones aún, esperar a que escriba el motivo
      setShowOptions(false);
    } else {
      setShowOptions(true);
    }
  };

  const handleCustomReasonSubmit = () => {
    if (customReason.trim()) {
      setShowOptions(true);
    }
  };

  const handleWaitOption = () => {
    // Simular entrada en cola de espera
    navigate('/advisor-wait', { 
      state: { 
        reason: selectedReason?.id === 'other' ? customReason : selectedReason?.title,
        type: 'wait'
      } 
    });
  };

  const handleVideoCallOption = () => {
    // Ir directamente a programar videollamada
    navigate('/schedule-advisor-call', { 
      state: { 
        reason: selectedReason?.id === 'other' ? customReason : selectedReason?.title,
        type: 'scheduled'
      } 
    });
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
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #f0f0f0'
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
    subtitle: {
      textAlign: 'center',
      color: '#666666',
      fontSize: '1.125rem',
      marginBottom: '2rem',
      fontWeight: '500'
    },
    reasonsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    reasonCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #f0f0f0',
      padding: '1.5rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
      minHeight: '140px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    reasonCardSelected: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #17ab9c',
      padding: '1.5rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
      minHeight: '140px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    reasonIcon: {
      fontSize: '2rem',
      marginBottom: '0.75rem'
    },
    reasonTitle: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '0.5rem'
    },
    reasonDescription: {
      fontSize: '0.875rem',
      color: '#666666',
      lineHeight: '1.4'
    },
    customReasonSection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #17ab9c',
      padding: '2rem',
      marginBottom: '2rem'
    },
    customReasonTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    textarea: {
      width: '100%',
      minHeight: '100px',
      padding: '1rem',
      border: '2px solid #f0f0f0',
      borderRadius: '12px',
      fontSize: '1rem',
      resize: 'vertical',
      boxSizing: 'border-box',
      marginBottom: '1rem'
    },
    submitCustomButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'block',
      margin: '0 auto'
    },
    optionsSection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #17ab9c',
      padding: '2rem',
      textAlign: 'center'
    },
    optionsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '1rem'
    },
    optionsDescription: {
      color: '#666666',
      fontSize: '1rem',
      marginBottom: '2rem',
      lineHeight: '1.5'
    },
    optionButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    optionButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      minWidth: '200px',
      transition: 'background-color 0.2s'
    },
    optionButtonSecondary: {
      backgroundColor: 'transparent',
      color: '#17ab9c',
      padding: '1rem 2rem',
      border: '2px solid #17ab9c',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      minWidth: '200px',
      transition: 'background-color 0.2s'
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
          <h1 style={styles.title}>💼 Consulta con Asesor</h1>
          <button
            style={styles.backButton}
            onClick={() => navigate('/specialty-selection')}
          >
            ← Volver
          </button>
        </div>

        {!showOptions && (
          <>
            <p style={styles.subtitle}>
              Selecciona el motivo de tu consulta administrativa
            </p>

            <div style={styles.reasonsGrid}>
              {consultationReasons.map((reason) => (
                <div
                  key={reason.id}
                  onClick={() => handleReasonSelect(reason)}
                  style={selectedReason?.id === reason.id ? styles.reasonCardSelected : styles.reasonCard}
                >
                  <div style={styles.reasonIcon}>{reason.icon}</div>
                  <h3 style={styles.reasonTitle}>{reason.title}</h3>
                  <p style={styles.reasonDescription}>{reason.description}</p>
                </div>
              ))}
            </div>

            {selectedReason?.id === 'other' && (
              <div style={styles.customReasonSection}>
                <h3 style={styles.customReasonTitle}>Describe tu consulta</h3>
                <textarea
                  style={styles.textarea}
                  placeholder="Explícanos en qué podemos ayudarte..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
                <button
                  style={styles.submitCustomButton}
                  onClick={handleCustomReasonSubmit}
                  disabled={!customReason.trim()}
                >
                  Continuar
                </button>
              </div>
            )}
          </>
        )}

        {showOptions && (
          <div style={styles.optionsSection}>
            <h2 style={styles.optionsTitle}>¿Cómo prefieres ser atendido?</h2>
            <p style={styles.optionsDescription}>
              Puedes esperar a ser atendido ahora mismo o programar una videollamada 
              para un momento más conveniente.
            </p>
            
            <div style={styles.optionButtons}>
              <button
                style={styles.optionButton}
                onClick={handleWaitOption}
              >
                ⏱️ Esperar ahora
              </button>
              
              <button
                style={styles.optionButtonSecondary}
                onClick={handleVideoCallOption}
              >
                📹 Programar videollamada
              </button>
            </div>

            <p style={{ marginTop: '1.5rem', color: '#666666', fontSize: '0.875rem' }}>
              <strong>Motivo seleccionado:</strong> {selectedReason?.id === 'other' ? customReason : selectedReason?.title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvisorConsultation;