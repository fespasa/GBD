import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function ScheduleAdvisorCall() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();
  
  const reason = location.state?.reason || 'Consulta general';
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  // Generar fechas disponibles (próximos 7 días laborables)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Solo días laborables (lunes a viernes)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates.slice(0, 7); // Máximo 7 fechas
  };

  // Horarios disponibles
  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) return;

    // Simular programación exitosa
    navigate('/advisor-scheduled', {
      state: {
        reason,
        date: selectedDate,
        time: selectedTime,
        notes,
        advisor: 'Asesor María García'
      }
    });
  };

  const formatDate = (date) => {
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
    reasonCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #17ab9c',
      padding: '1.5rem',
      marginBottom: '2rem',
      textAlign: 'center'
    },
    reasonTitle: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '0.5rem'
    },
    reasonText: {
      color: '#666666',
      fontSize: '1rem'
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #f0f0f0',
      padding: '2rem',
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '1.5rem'
    },
    dateGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    dateButton: {
      padding: '1rem',
      border: '2px solid #f0f0f0',
      borderRadius: '12px',
      backgroundColor: 'white',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'border-color 0.2s',
      fontSize: '0.875rem'
    },
    dateButtonSelected: {
      padding: '1rem',
      border: '2px solid #17ab9c',
      borderRadius: '12px',
      backgroundColor: 'white',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'border-color 0.2s',
      fontSize: '0.875rem'
    },
    timeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
      gap: '0.5rem'
    },
    timeButton: {
      padding: '0.75rem',
      border: '2px solid #f0f0f0',
      borderRadius: '8px',
      backgroundColor: 'white',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    timeButtonSelected: {
      padding: '0.75rem',
      border: '2px solid #17ab9c',
      borderRadius: '8px',
      backgroundColor: '#17ab9c',
      color: 'white',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    textarea: {
      width: '100%',
      minHeight: '100px',
      padding: '1rem',
      border: '2px solid #f0f0f0',
      borderRadius: '12px',
      fontSize: '1rem',
      resize: 'vertical',
      boxSizing: 'border-box'
    },
    scheduleButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.125rem',
      fontWeight: '700',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '300px',
      margin: '0 auto',
      display: 'block'
    },
    scheduleButtonDisabled: {
      backgroundColor: '#e0e0e0',
      color: '#999999',
      cursor: 'not-allowed'
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const availableDates = getAvailableDates();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>📹 Programar Videollamada</h1>
          <button
            style={styles.backButton}
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
        </div>

        <div style={styles.reasonCard}>
          <div style={styles.reasonTitle}>Motivo de la consulta:</div>
          <div style={styles.reasonText}>{reason}</div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Selecciona una fecha</h3>
          <div style={styles.dateGrid}>
            {availableDates.map((date, index) => (
              <button
                key={index}
                style={selectedDate === date.toDateString() ? styles.dateButtonSelected : styles.dateButton}
                onClick={() => setSelectedDate(date.toDateString())}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Selecciona una hora</h3>
            <div style={styles.timeGrid}>
              {availableTimes.map((time) => (
                <button
                  key={time}
                  style={selectedTime === time ? styles.timeButtonSelected : styles.timeButton}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Información adicional (opcional)</h3>
          <textarea
            style={styles.textarea}
            placeholder="Añade cualquier detalle adicional que pueda ayudar al asesor..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          style={{
            ...styles.scheduleButton,
            ...((!selectedDate || !selectedTime) ? styles.scheduleButtonDisabled : {})
          }}
          onClick={handleSchedule}
          disabled={!selectedDate || !selectedTime}
        >
          {selectedDate && selectedTime 
            ? `Programar para ${new Date(selectedDate).toLocaleDateString('es-ES')} a las ${selectedTime}`
            : 'Selecciona fecha y hora'
          }
        </button>
      </div>
    </div>
  );
}

export default ScheduleAdvisorCall;