import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function ScheduleCall() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [step, setStep] = useState(1); // 1: fecha, 2: hora, 3: confirmación
  
  // Obtener datos del estado anterior
  const contactData = location.state || {};
  const { specialty, phone, triageResult, formData, type } = contactData;

  useEffect(() => {
    if (!specialty || !phone) {
      navigate('/specialties');
      return;
    }
  }, [specialty, phone, navigate]);

  // Generar días disponibles (hoy + próximos 14 días)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Excluir fines de semana
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric',
            month: 'short'
          }),
          fullLabel: date.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          isToday: i === 0
        });
      }
    }
    
    return dates;
  };

  // Generar horarios disponibles para una fecha
  const generateTimeSlots = (date) => {
    const slots = [];
    const selectedDateObj = new Date(date + 'T00:00:00');
    const now = new Date();
    const isToday = selectedDateObj.toDateString() === now.toDateString();
    
    // Horarios de mañana: 9:00 - 12:00
    for (let hour = 9; hour <= 12; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 12 && minute === 30) continue;
        
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Si es hoy, solo mostrar horarios futuros (con 1 hora de margen)
        if (isToday) {
          const slotTime = new Date();
          slotTime.setHours(hour, minute, 0, 0);
          const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
          if (slotTime <= oneHourFromNow) continue;
        }
        
        slots.push({
          value: timeStr,
          label: timeStr,
          period: 'Mañana'
        });
      }
    }
    
    // Horarios de tarde: 15:00 - 17:30
    for (let hour = 15; hour <= 17; hour++) {
      for (let minute of [0, 30]) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Si es hoy, solo mostrar horarios futuros (con 1 hora de margen)
        if (isToday) {
          const slotTime = new Date();
          slotTime.setHours(hour, minute, 0, 0);
          const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
          if (slotTime <= oneHourFromNow) continue;
        }
        
        slots.push({
          value: timeStr,
          label: timeStr,
          period: 'Tarde'
        });
      }
    }
    
    return slots;
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert('Por favor, seleccione fecha y hora');
      return;
    }

    setIsBooking(true);
    
    // Simular reserva
    setTimeout(() => {
      navigate('/video-call', {
        state: {
          specialty: specialty,
          phone: phone,
          triageResult: triageResult,
          formData: formData,
          type: type,
          appointmentDetails: {
            date: selectedDate,
            time: selectedTime,
            dateLabel: availableDates.find(d => d.value === selectedDate)?.fullLabel
          },
          callType: 'scheduled'
        }
      });
    }, 1500);
  };

  const availableDates = generateAvailableDates();
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const getSpecialtyName = () => {
    if (type === 'mental-health-form') return 'Salud Mental';
    const specialtyNames = {
      'general-medicine': 'Medicina General',
      'pediatrics': 'Pediatría', 
      'womens-health': 'Salud de la Mujer',
      'mental-health': 'Salud Mental'
    };
    return specialtyNames[specialty] || 'Consulta Médica';
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
      padding: '32px 16px'
    },
    calendlyContainer: {
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      minHeight: '500px'
    },
    sidebar: {
      padding: '32px',
      backgroundColor: '#f8fafc',
      borderRight: '1px solid #e5e7eb'
    },
    sidebarTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '8px'
    },
    sidebarSubtitle: {
      color: '#6b7280',
      marginBottom: '24px',
      fontSize: '16px'
    },
    sidebarDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    sidebarDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#374751',
      fontSize: '14px'
    },
    mainContent: {
      padding: '32px'
    },
    stepTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '24px'
    },
    dateGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: '12px',
      marginBottom: '32px'
    },
    dateButton: {
      padding: '16px 12px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'left'
    },
    timeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '8px',
      marginBottom: '32px'
    },
    timeButton: {
      padding: '12px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '500'
    },
    periodTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#374751',
      marginBottom: '12px',
      marginTop: '24px'
    },
    confirmButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      padding: '16px 32px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      width: '100%'
    },
    backButton: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      padding: '12px 24px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      marginTop: '16px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Programar Videollamada</h1>
        <p style={styles.headerSubtitle}>{getSpecialtyName()}</p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.calendlyContainer}>
          <div style={styles.layout}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
              <h2 style={styles.sidebarTitle}>Consulta Médica</h2>
              <p style={styles.sidebarSubtitle}>{getSpecialtyName()}</p>
              
              <div style={styles.sidebarDetails}>
                <div style={styles.sidebarDetail}>
                  <span>⏱️</span>
                  <span>30 minutos</span>
                </div>
                <div style={styles.sidebarDetail}>
                  <span>📞</span>
                  <span>{phone}</span>
                </div>
                <div style={styles.sidebarDetail}>
                  <span>💻</span>
                  <span>Videollamada</span>
                </div>
                {selectedDate && selectedTime && (
                  <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#e6fffa', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '600', color: '#17ab9c', marginBottom: '4px' }}>
                      📅 Fecha seleccionada
                    </div>
                    <div style={{ fontSize: '14px', color: '#374751' }}>
                      {availableDates.find(d => d.value === selectedDate)?.fullLabel}
                    </div>
                    <div style={{ fontSize: '14px', color: '#374751', marginTop: '4px' }}>
                      🕐 {selectedTime}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
              {step === 1 && (
                <>
                  <h3 style={styles.stepTitle}>Seleccione una fecha</h3>
                  <div style={styles.dateGrid}>
                    {availableDates.map((date) => (
                      <button
                        key={date.value}
                        onClick={() => {
                          setSelectedDate(date.value);
                          setStep(2);
                        }}
                        style={styles.dateButton}
                      >
                        <div style={{ fontWeight: '600', color: '#111827' }}>
                          {date.isToday ? 'Hoy' : date.label.split(',')[0]}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                          {date.label.split(',').slice(1).join(',')}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <button
                      onClick={() => setStep(1)}
                      style={{ ...styles.backButton, padding: '8px 12px', marginTop: 0 }}
                    >
                      ← Volver
                    </button>
                    <h3 style={{ ...styles.stepTitle, marginBottom: 0 }}>
                      Seleccione una hora
                    </h3>
                  </div>
                  
                  {timeSlots.length === 0 ? (
                    <p style={{ color: '#6b7280', textAlign: 'center', padding: '40px' }}>
                      No hay horarios disponibles para esta fecha
                    </p>
                  ) : (
                    <>
                      {/* Horarios de Mañana */}
                      {timeSlots.filter(slot => slot.period === 'Mañana').length > 0 && (
                        <>
                          <div style={styles.periodTitle}>🌅 Mañana</div>
                          <div style={styles.timeGrid}>
                            {timeSlots
                              .filter(slot => slot.period === 'Mañana')
                              .map((slot) => (
                                <button
                                  key={slot.value}
                                  onClick={() => {
                                    setSelectedTime(slot.value);
                                    setStep(3);
                                  }}
                                  style={styles.timeButton}
                                >
                                  {slot.label}
                                </button>
                              ))}
                          </div>
                        </>
                      )}

                      {/* Horarios de Tarde */}
                      {timeSlots.filter(slot => slot.period === 'Tarde').length > 0 && (
                        <>
                          <div style={styles.periodTitle}>🌆 Tarde</div>
                          <div style={styles.timeGrid}>
                            {timeSlots
                              .filter(slot => slot.period === 'Tarde')
                              .map((slot) => (
                                <button
                                  key={slot.value}
                                  onClick={() => {
                                    setSelectedTime(slot.value);
                                    setStep(3);
                                  }}
                                  style={styles.timeButton}
                                >
                                  {slot.label}
                                </button>
                              ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <button
                      onClick={() => setStep(2)}
                      style={{ ...styles.backButton, padding: '8px 12px', marginTop: 0 }}
                    >
                      ← Cambiar hora
                    </button>
                    <h3 style={{ ...styles.stepTitle, marginBottom: 0 }}>
                      Confirmar cita
                    </h3>
                  </div>

                  <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                      Resumen de su cita
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={styles.sidebarDetail}>
                        <span>📋</span>
                        <span>{getSpecialtyName()}</span>
                      </div>
                      <div style={styles.sidebarDetail}>
                        <span>📅</span>
                        <span>{availableDates.find(d => d.value === selectedDate)?.fullLabel}</span>
                      </div>
                      <div style={styles.sidebarDetail}>
                        <span>🕐</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div style={styles.sidebarDetail}>
                        <span>📞</span>
                        <span>{phone}</span>
                      </div>
                      <div style={styles.sidebarDetail}>
                        <span>⏱️</span>
                        <span>Duración: 30 minutos</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    disabled={isBooking}
                    style={{
                      ...styles.confirmButton,
                      backgroundColor: isBooking ? '#9ca3af' : '#17ab9c'
                    }}
                  >
                    {isBooking ? 'Programando cita...' : 'Confirmar videollamada'}
                  </button>

                  <button
                    onClick={() => navigate('/contact-options', { state: contactData })}
                    style={styles.backButton}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCall;