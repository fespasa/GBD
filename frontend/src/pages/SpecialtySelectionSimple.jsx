import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logoGlobalDoctors from '../assets/GlobalDoctors.png';

function SpecialtySelectionSimple() {
  const navigate = useNavigate();
  const { user, setSpecialty } = useApp();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const specialties = [
    {
      id: 'general-medicine',
      name: 'Adultos',
      description: 'Medicina general para adultos',
      icon: '👨‍⚕️',
      color: '#2dd4bf'
    },
    {
      id: 'pediatrics',
      name: 'Pediatría',
      description: 'Atención médica especializada para niños',
      icon: '👶',
      color: '#059669'
    },
    {
      id: 'womens-health',
      name: 'Mujer',
      description: 'Salud femenina y ginecología',
      icon: '👩‍⚕️',
      color: '#0d9488'
    },
    {
      id: 'mental-health',
      name: 'Salud Mental',
      description: 'Apoyo psicológico y salud mental',
      icon: '🧠',
      color: '#14b8a6'
    }
  ];

  const handleSpecialtySelect = (specialty) => {
    console.log('Specialty selected:', specialty);
    console.log('Specialty ID:', specialty.id);
    setSpecialty(specialty);
    
    // Para salud mental, ir directo al formulario en lugar del triaje
    if (specialty.id === 'mental-health') {
      console.log('Navigating to mental health form');
      navigate('/mental-health-form');
    } else {
      console.log('Navigating to triage for:', specialty.id);
      navigate(`/triage/${specialty.id}`);
    }
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
      textAlign: 'center',
      marginBottom: '2rem'
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '3rem'
    },
    logoImage: {
      width: '200px',
      height: 'auto',
      display: 'block',
      filter: 'drop-shadow(0 4px 8px rgba(45, 212, 191, 0.3))'
    },

    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#666666',
      fontWeight: '500'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem auto'
    },
    card: {
      cursor: 'pointer',
      transition: 'border-color 0.2s',
      borderRadius: '12px',
      border: '2px solid #f0f0f0',
      padding: '1.5rem',
      textAlign: 'center',
      backgroundColor: 'white',
      minHeight: '140px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    icon: {
      fontSize: '2.5rem',
      marginBottom: '0.75rem',
      color: '#17ab9c'
    },
    cardTitle: {
      fontSize: '1rem',
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: '0.5rem'
    },
    cardDesc: {
      color: '#666666',
      fontSize: '0.8rem',
      lineHeight: '1.4'
    },
    info: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    },
    infoTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.75rem'
    },
    infoList: {
      color: '#4b5563',
      fontSize: '0.875rem',
      lineHeight: '1.5'
    },
    backLink: {
      textAlign: 'center'
    },
    link: {
      color: '#6b7280',
      textDecoration: 'none',
      fontSize: '0.875rem'
    },
    userMenuContainer: {
      position: 'relative'
    },
    userMenuButton: {
      backgroundColor: 'transparent',
      border: '2px solid #17ab9c',
      color: '#17ab9c',
      padding: '10px 16px',
      borderRadius: '12px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    userMenu: {
      position: 'absolute',
      top: '100%',
      right: '0',
      backgroundColor: 'white',
      border: '2px solid #17ab9c',
      borderRadius: '12px',
      padding: '8px 0',
      minWidth: '220px',
      zIndex: 10,
      marginTop: '4px'
    },
    menuItem: {
      display: 'block',
      width: '100%',
      padding: '12px 16px',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#17ab9c',
      transition: 'background-color 0.2s',
      fontWeight: '600'
    },
    menuItemHover: {
      backgroundColor: '#f9fafb'
    },
    advisorSection: {
      marginTop: '1rem',
      marginBottom: '2rem'
    },
    advisorCard: {
      backgroundColor: '#17ab9c',
      borderRadius: '12px',
      border: 'none',
      padding: '2rem',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 4px 12px rgba(23, 171, 156, 0.2)'
    },
    advisorIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      color: 'white'
    },
    advisorTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '1rem'
    },
    advisorDescription: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1rem',
      lineHeight: '1.5',
      marginBottom: '1.5rem'
    },
    advisorButton: {
      backgroundColor: 'white',
      color: '#17ab9c',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.125rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: '220px'
    }
  };

  if (!user) {
    console.log('No user found, redirecting to home');
    navigate('/');
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={styles.logoContainer}>
              <img 
                src={logoGlobalDoctors} 
                alt="Global Doctors Logo" 
                style={styles.logoImage}
              />
            </div>
            <div style={styles.userMenuContainer}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={styles.userMenuButton}
              >
                👤 {user?.name} ▾
              </button>
              
              {userMenuOpen && (
                <div style={styles.userMenu}>
                  <button
                    style={styles.menuItem}
                    onClick={() => {
                      navigate('/profile-complete');
                      setUserMenuOpen(false);
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    📝 Completar Perfil
                  </button>
                  
                  <button
                    style={styles.menuItem}
                    onClick={() => {
                      navigate('/reports');
                      setUserMenuOpen(false);
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    📊 Informes Médicos
                  </button>
                  
                  <button
                    style={styles.menuItem}
                    onClick={() => {
                      navigate('/history');
                      setUserMenuOpen(false);
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    📋 Historial de la App
                  </button>
                  
                  <button
                    style={styles.menuItem}
                    onClick={() => {
                      navigate('/appointments');
                      setUserMenuOpen(false);
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    �️ Visitas Concertadas
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <h1 style={styles.title}>
            Bienvenido/a, {user?.name}
          </h1>
          <p style={styles.subtitle}>
            Seleccione la especialidad médica para su consulta
          </p>
        </div>

        <div style={styles.grid}>
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              onClick={() => handleSpecialtySelect(specialty)}
              style={styles.card}
            >
              <div style={styles.icon}>{specialty.icon}</div>
              <h3 style={styles.cardTitle}>{specialty.name}</h3>
              <p style={styles.cardDesc}>{specialty.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.advisorSection}>
          <div style={styles.advisorCard}>
            <div style={styles.advisorIcon}>🏢</div>
            <h3 style={styles.advisorTitle}>¿Necesitas ayuda administrativa?</h3>
            <p style={styles.advisorDescription}>
              Consulta con nuestros asesores especializados para temas administrativos, 
              seguros médicos, gestión de citas o cualquier duda sobre nuestros servicios.
            </p>
            <button
              onClick={() => {
                console.log('Botón asesor clickeado!');
                navigate('/advisor-consultation');
              }}
              style={styles.advisorButton}
            >
              💼 Consultar con Asesor
            </button>
          </div>
        </div>

        <div style={styles.info}>
          <h3 style={styles.infoTitle}>¿Cómo funciona el triaje?</h3>
          <div style={styles.infoList}>
            <p>• Responderá a una serie de preguntas médicas específicas</p>
            <p>• El sistema evaluará automáticamente su caso</p>
            <p>• Recibirá una clasificación de urgencia y recomendaciones</p>
            <p>• Podrá adjuntar documentos médicos si lo necesita</p>
            <p>• Opcional: simulación de videollamada con un profesional</p>
          </div>
        </div>

        <div style={styles.backLink}>
          <button
            onClick={() => navigate('/')}
            style={{ ...styles.link, border: 'none', background: 'none', cursor: 'pointer' }}
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpecialtySelectionSimple;