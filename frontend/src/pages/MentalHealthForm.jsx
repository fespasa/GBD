import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * FORMULARIO DE SALUD MENTAL - GLOBAL DOCTORS
 * 
 * Componente específico para consultas de salud mental que NO utiliza triaje.
 * El paciente simplemente describe su motivo de consulta y selecciona
 * si prefiere ser llamado inmediatamente o agendar una cita.
 * 
 * Funcionalidades:
 * - Formulario libre de motivo de consulta
 * - Opción 1: "Ser llamado en breve" (llamada inmediata)
 * - Opción 2: "Agendar videollamada" (calendario estilo Calendly)
 * 
 * @author Global Doctors Team
 * @version 1.0.0
 */

function MentalHealthForm() {
  const navigate = useNavigate();
  const { user, currentSpecialty } = useApp();
  
  // Estados del formulario
  const [consultationReason, setConsultationReason] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación de autenticación
  React.useEffect(() => {
    if (!user || !currentSpecialty) {
      navigate('/');
      return;
    }
  }, [user, currentSpecialty, navigate]);

  /**
   * Genera slots de tiempo disponibles para el selector de hora
   */
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute of [0, 30]) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  /**
   * Genera fechas disponibles (próximos 14 días, excluyendo fines de semana)
   */
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 20; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Excluir fines de semana (sábado = 6, domingo = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };

  /**
   * Maneja el envío del formulario de salud mental
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!consultationReason.trim()) {
      alert('Por favor, describa el motivo de su consulta');
      return;
    }

    if (!appointmentType) {
      alert('Por favor, seleccione cómo prefiere ser atendido');
      return;
    }

    if (appointmentType === 'scheduled' && (!selectedDate || !selectedTime)) {
      alert('Por favor, seleccione fecha y hora para su cita');
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos de la consulta
      const consultationData = {
        specialty: 'Salud Mental',
        patientId: user.id,
        consultationReason: consultationReason.trim(),
        appointmentType,
        scheduledDate: appointmentType === 'scheduled' ? selectedDate : null,
        scheduledTime: appointmentType === 'scheduled' ? selectedTime : null,
        requestedAt: new Date().toISOString()
      };

      // Simular envío de datos (aquí iría la llamada real al backend)
      console.log('Enviando consulta de salud mental:', consultationData);
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navegar a confirmación según el tipo de cita
      if (appointmentType === 'immediate') {
        navigate('/wait-for-call', { 
          state: { 
            specialty: 'Salud Mental',
            type: 'immediate',
            consultationData 
          } 
        });
      } else {
        navigate('/contact-options', { 
          state: { 
            specialty: 'Salud Mental',
            type: 'scheduled',
            consultationData 
          } 
        });
      }

    } catch (error) {
      console.error('Error al enviar consulta:', error);
      alert('Ha ocurrido un error. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #e8f5e8 100%)',
      padding: '2rem 1rem'
    },
    content: {
      maxWidth: '64rem',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    iconContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '64px',
      height: '64px',
      backgroundColor: '#e1bee7',
      borderRadius: '50%',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#6b7280',
      maxWidth: '32rem',
      margin: '0 auto'
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '2rem',
      marginBottom: '2rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.75rem'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      resize: 'vertical',
      minHeight: '120px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    textareaFocus: {
      borderColor: '#9333ea',
      boxShadow: '0 0 0 3px rgba(147, 51, 234, 0.1)'
    },
    charCounter: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginTop: '0.5rem'
    },
    radioContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    radioOption: {
      position: 'relative',
      padding: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    radioOptionSelected: {
      borderColor: '#9333ea',
      backgroundColor: '#faf5ff'
    },
    radioOptionHover: {
      borderColor: '#d1d5db'
    },
    radioContent: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    radioInput: {
      marginTop: '0.25rem',
      width: '1rem',
      height: '1rem',
      accentColor: '#9333ea'
    },
    radioText: {
      marginLeft: '0.75rem'
    },
    radioTitle: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#111827',
      cursor: 'pointer'
    },
    radioDesc: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    },
    schedulingSection: {
      backgroundColor: '#f9fafb',
      padding: '1.5rem',
      borderRadius: '0.5rem'
    },
    schedulingTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '1rem'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem'
    },
    gridContainerMd: {
      '@media (min-width: 768px)': {
        gridTemplateColumns: '1fr 1fr'
      }
    },
    select: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    selectFocus: {
      borderColor: '#9333ea',
      boxShadow: '0 0 0 3px rgba(147, 51, 234, 0.1)'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      paddingTop: '1.5rem'
    },
    buttonContainerSm: {
      '@media (min-width: 640px)': {
        flexDirection: 'row'
      }
    },
    backButton: {
      flex: '1',
      padding: '0.75rem 1.5rem',
      border: '1px solid #d1d5db',
      color: '#374151',
      borderRadius: '0.5rem',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontSize: '1rem'
    },
    backButtonHover: {
      backgroundColor: '#f9fafb'
    },
    submitButton: {
      flex: '1',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      transition: 'all 0.2s',
      fontSize: '1rem',
      border: 'none',
      cursor: 'pointer'
    },
    submitButtonActive: {
      backgroundColor: '#9333ea',
      color: 'white'
    },
    submitButtonHover: {
      backgroundColor: '#7c3aed',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    submitButtonDisabled: {
      backgroundColor: '#9ca3af',
      color: 'white',
      cursor: 'not-allowed'
    },
    loadingSpinner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    infoSection: {
      backgroundColor: '#dbeafe',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      textAlign: 'center'
    },
    infoHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '0.75rem'
    },
    infoTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1e3a8a'
    },
    infoText: {
      color: '#1e40af'
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
      <div style={styles.container}>
        <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <svg width="32" height="32" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 style={styles.title}>
            Consulta de Salud Mental
          </h1>
          <p style={styles.subtitle}>
            Estamos aquí para ayudarle. Complete el formulario y elija cómo prefiere ser atendido.
          </p>
        </div>

        {/* Formulario */}
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            
            {/* Motivo de consulta */}
            <div style={styles.fieldGroup}>
              <label htmlFor="consultationReason" style={styles.label}>
                Motivo de su consulta *
              </label>
              <textarea
                id="consultationReason"
                value={consultationReason}
                onChange={(e) => setConsultationReason(e.target.value)}
                placeholder="Describa brevemente el motivo por el que solicita una consulta de salud mental. No es necesario dar detalles específicos, simplemente una descripción general..."
                style={styles.textarea}
                maxLength={500}
                required
                onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <p style={styles.charCounter}>
                {consultationReason.length}/500 caracteres
              </p>
            </div>

            {/* Tipo de atención */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                ¿Cómo prefiere ser atendido? *
              </label>
              
              <div style={styles.radioContainer}>
                {/* Llamada inmediata */}
                <div 
                  style={{
                    ...styles.radioOption,
                    ...(appointmentType === 'immediate' ? styles.radioOptionSelected : {})
                  }}
                  onClick={() => setAppointmentType('immediate')}
                  onMouseEnter={(e) => {
                    if (appointmentType !== 'immediate') {
                      e.target.style.borderColor = '#d1d5db';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (appointmentType !== 'immediate') {
                      e.target.style.borderColor = '#e5e7eb';
                    }
                  }}
                >
                  <div style={styles.radioContent}>
                    <input
                      type="radio"
                      id="immediate"
                      name="appointmentType"
                      value="immediate"
                      checked={appointmentType === 'immediate'}
                      onChange={(e) => setAppointmentType(e.target.value)}
                      style={styles.radioInput}
                    />
                    <div style={styles.radioText}>
                      <label htmlFor="immediate" style={styles.radioTitle}>
                        📞 Ser llamado en breve
                      </label>
                      <p style={styles.radioDesc}>
                        Un profesional de salud mental le llamará en los próximos 30-60 minutos para una consulta telefónica inmediata.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cita programada */}
                <div 
                  style={{
                    ...styles.radioOption,
                    ...(appointmentType === 'scheduled' ? styles.radioOptionSelected : {})
                  }}
                  onClick={() => setAppointmentType('scheduled')}
                  onMouseEnter={(e) => {
                    if (appointmentType !== 'scheduled') {
                      e.target.style.borderColor = '#d1d5db';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (appointmentType !== 'scheduled') {
                      e.target.style.borderColor = '#e5e7eb';
                    }
                  }}
                >
                  <div style={styles.radioContent}>
                    <input
                      type="radio"
                      id="scheduled"
                      name="appointmentType"
                      value="scheduled"
                      checked={appointmentType === 'scheduled'}
                      onChange={(e) => setAppointmentType(e.target.value)}
                      style={styles.radioInput}
                    />
                    <div style={styles.radioText}>
                      <label htmlFor="scheduled" style={styles.radioTitle}>
                        📅 Agendar videollamada
                      </label>
                      <p style={styles.radioDesc}>
                        Programe una videoconsulta en el horario que mejor le convenga.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selector de fecha y hora (solo si se eligió cita programada) */}
            {appointmentType === 'scheduled' && (
              <div style={styles.schedulingSection}>
                <h3 style={styles.schedulingTitle}>
                  Seleccione fecha y hora
                </h3>
                
                <div style={{...styles.gridContainer, display: 'grid', gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr', gap: '1rem'}}>
                  {/* Selector de fecha */}
                  <div style={styles.fieldGroup}>
                    <label htmlFor="selectedDate" style={styles.label}>
                      Fecha *
                    </label>
                    <select
                      id="selectedDate"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      style={styles.select}
                      required={appointmentType === 'scheduled'}
                      onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    >
                      <option value="">Seleccionar fecha...</option>
                      {generateAvailableDates().map(date => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selector de hora */}
                  <div style={styles.fieldGroup}>
                    <label htmlFor="selectedTime" style={styles.label}>
                      Hora *
                    </label>
                    <select
                      id="selectedTime"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      style={styles.select}
                      required={appointmentType === 'scheduled'}
                      onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    >
                      <option value="">Seleccionar hora...</option>
                      {generateTimeSlots().map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div style={{...styles.buttonContainer, display: 'flex', flexDirection: window.innerWidth >= 640 ? 'row' : 'column', gap: '1rem', paddingTop: '1.5rem'}}>
              <button
                type="button"
                onClick={() => navigate('/specialties')}
                style={styles.backButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ← Volver a especialidades
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting ? styles.submitButtonDisabled : styles.submitButtonActive)
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = '#7c3aed';
                    e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = '#9333ea';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {isSubmitting ? (
                  <span style={styles.loadingSpinner}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="spin" style={{marginRight: '0.75rem'}}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                      <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  appointmentType === 'immediate' 
                    ? 'Solicitar llamada' 
                    : 'Agendar cita'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Información adicional */}
        <div style={styles.infoSection}>
          <div style={styles.infoHeader}>
            <svg width="24" height="24" fill="none" stroke="#1e3a8a" viewBox="0 0 24 24" style={{marginRight: '0.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 style={styles.infoTitle}>Información importante</h3>
          </div>
          <p style={styles.infoText}>
            Sus datos están protegidos por el secreto profesional. Si necesita atención de emergencia, 
            llame al <strong>112</strong> o acuda al servicio de urgencias más cercano.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default MentalHealthForm;