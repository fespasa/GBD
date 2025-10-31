import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Reports() {
  const navigate = useNavigate();
  const { user } = useApp();

  // Datos de ejemplo para la demo
  const reports = [
    {
      id: 1,
      date: '2024-10-20',
      doctor: 'Dr. María González',
      specialty: 'Medicina General',
      diagnosis: 'Revisión anual - Estado de salud óptimo',
      type: 'Consulta General',
      status: 'Completado'
    },
    {
      id: 2,
      date: '2024-09-15',
      doctor: 'Dr. Carlos Martín',
      specialty: 'Cardiología',
      diagnosis: 'Electrocardiograma normal - Sin anomalías detectadas',
      type: 'Consulta Especializada',
      status: 'Completado'
    },
    {
      id: 3,
      date: '2024-08-08',
      doctor: 'Dra. Ana López',
      specialty: 'Dermatología',
      diagnosis: 'Control dermatológico - Recomendaciones preventivas',
      type: 'Consulta de Seguimiento',
      status: 'Completado'
    }
  ];

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
    reportsGrid: {
      display: 'grid',
      gap: '1rem'
    },
    reportCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '2px solid #f0f0f0'
    },
    reportHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    reportDate: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    reportStatus: {
      backgroundColor: '#17ab9c',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    doctorName: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '0.25rem'
    },
    specialty: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.75rem'
    },
    diagnosis: {
      fontSize: '0.95rem',
      color: '#374151',
      lineHeight: '1.4',
      marginBottom: '0.75rem'
    },
    reportType: {
      fontSize: '0.875rem',
      color: '#059669',
      fontWeight: '500'
    },
    downloadButton: {
      backgroundColor: '#17ab9c',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginTop: '0.75rem'
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
          <h1 style={styles.title}>📊 Informes Médicos</h1>
          <button
            style={styles.backButton}
            onClick={() => navigate('/specialty-selection')}
          >
            ← Volver
          </button>
        </div>

        {reports.length > 0 ? (
          <div style={styles.reportsGrid}>
            {reports.map((report) => (
              <div key={report.id} style={styles.reportCard}>
                <div style={styles.reportHeader}>
                  <div style={styles.reportDate}>
                    {new Date(report.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div style={styles.reportStatus}>{report.status}</div>
                </div>
                
                <div style={styles.doctorName}>{report.doctor}</div>
                <div style={styles.specialty}>{report.specialty}</div>
                <div style={styles.diagnosis}>{report.diagnosis}</div>
                <div style={styles.reportType}>Tipo: {report.type}</div>
                
                <button style={styles.downloadButton}>
                  📄 Descargar Informe
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📄</div>
            <p style={styles.emptyText}>
              No hay informes médicos disponibles todavía.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;