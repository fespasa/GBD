import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Appointments() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Datos de ejemplo para la demo
  const upcomingAppointments = [
    {
      id: 1,
      date: '2024-11-15',
      time: '10:00',
      doctor: 'Dr. María González',
      specialty: 'Medicina General',
      type: 'Revisión anual',
      location: 'Consulta Virtual',
      status: 'confirmada'
    },
    {
      id: 2,
      date: '2024-11-22',
      time: '14:30',
      doctor: 'Dr. Carlos Martín',
      specialty: 'Cardiología',
      type: 'Seguimiento',
      location: 'Clínica Central',
      status: 'pendiente'
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      date: '2024-10-20',
      time: '14:20',
      doctor: 'Dr. María González',
      specialty: 'Medicina General',
      type: 'Consulta general',
      location: 'Consulta Virtual',
      status: 'completada'
    },
    {
      id: 4,
      date: '2024-09-15',
      time: '11:10',
      doctor: 'Dr. Carlos Martín',
      specialty: 'Cardiología',
      type: 'Electrocardiograma',
      location: 'Clínica Central',
      status: 'completada'
    }
  ];

  const getStatusColor = (status) => {
    // Todos los estados usan el color principal para consistencia
    return '#17ab9c';
  };

  const getStatusText = (status) => {
    const texts = {
      confirmada: 'Confirmada',
      pendiente: 'Pendiente confirmación',
      completada: 'Completada'
    };
    return texts[status] || status;
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
    tabs: {
      display: 'flex',
      marginBottom: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '0.25rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    tab: {
      flex: 1,
      padding: '0.75rem 1rem',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderRadius: '6px',
      fontSize: '0.95rem',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    tabActive: {
      backgroundColor: '#17ab9c',
      color: 'white'
    },
    tabInactive: {
      color: '#6b7280'
    },
    appointmentsGrid: {
      display: 'grid',
      gap: '1rem'
    },
    appointmentCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    appointmentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    appointmentDate: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827'
    },
    appointmentTime: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    },
    appointmentStatus: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: 'white'
    },
    doctorInfo: {
      marginBottom: '0.75rem'
    },
    doctorName: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    },
    specialty: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    appointmentDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    detailItem: {
      fontSize: '0.875rem'
    },
    detailLabel: {
      color: '#6b7280',
      fontWeight: '500'
    },
    detailValue: {
      color: '#111827',
      marginTop: '0.25rem'
    },
    appointmentActions: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1rem'
    },
    actionButton: {
      padding: '6px 12px',
      borderRadius: '4px',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    primaryButton: {
      backgroundColor: '#17ab9c',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem'
    },
    emptyText: {
      color: '#6b7280',
      fontSize: '1.125rem'
    },
    newAppointmentButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      margin: '0 auto',
      display: 'block',
      marginTop: '1rem'
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const currentAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>🗓️ Visitas Concertadas</h1>
          <button
            style={styles.backButton}
            onClick={() => navigate('/specialty-selection')}
          >
            ← Volver
          </button>
        </div>

        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'upcoming' ? styles.tabActive : styles.tabInactive)
            }}
            onClick={() => setActiveTab('upcoming')}
          >
            Próximas Citas ({upcomingAppointments.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'past' ? styles.tabActive : styles.tabInactive)
            }}
            onClick={() => setActiveTab('past')}
          >
            Historial ({pastAppointments.length})
          </button>
        </div>

        {currentAppointments.length > 0 ? (
          <div style={styles.appointmentsGrid}>
            {currentAppointments.map((appointment) => (
              <div key={appointment.id} style={styles.appointmentCard}>
                <div style={styles.appointmentHeader}>
                  <div>
                    <div style={styles.appointmentDate}>
                      {new Date(appointment.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div style={styles.appointmentTime}>
                      {appointment.time}
                    </div>
                  </div>
                  <div 
                    style={{
                      ...styles.appointmentStatus,
                      backgroundColor: getStatusColor(appointment.status)
                    }}
                  >
                    {getStatusText(appointment.status)}
                  </div>
                </div>

                <div style={styles.doctorInfo}>
                  <div style={styles.doctorName}>{appointment.doctor}</div>
                  <div style={styles.specialty}>{appointment.specialty}</div>
                </div>

                <div style={styles.appointmentDetails}>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Tipo de consulta</div>
                    <div style={styles.detailValue}>{appointment.type}</div>
                  </div>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Ubicación</div>
                    <div style={styles.detailValue}>{appointment.location}</div>
                  </div>
                </div>

                {activeTab === 'upcoming' && (
                  <div style={styles.appointmentActions}>
                    {appointment.location === 'Consulta Virtual' && (
                      <button style={{...styles.actionButton, ...styles.primaryButton}}>
                        📹 Unirse a videollamada
                      </button>
                    )}
                    <button style={{...styles.actionButton, ...styles.secondaryButton}}>
                      📝 Modificar cita
                    </button>
                    <button style={{...styles.actionButton, ...styles.secondaryButton}}>
                      ❌ Cancelar cita
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📅</div>
            <p style={styles.emptyText}>
              {activeTab === 'upcoming' 
                ? 'No tienes citas próximas programadas.'
                : 'No hay citas en tu historial todavía.'}
            </p>
            {activeTab === 'upcoming' && (
              <button 
                style={styles.newAppointmentButton}
                onClick={() => navigate('/specialty-selection')}
              >
                + Solicitar Nueva Cita
              </button>
            )}
          </div>
        )}

        {activeTab === 'upcoming' && currentAppointments.length > 0 && (
          <button 
            style={{...styles.newAppointmentButton, marginTop: '2rem'}}
            onClick={() => navigate('/specialty-selection')}
          >
            + Solicitar Nueva Cita
          </button>
        )}
      </div>
    </div>
  );
}

export default Appointments;