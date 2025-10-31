import React from 'react';
import { Link } from 'react-router-dom';
import logoGlobalDoctors from '../assets/GlobalDoctors.png';

function WelcomeSimple() {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    },
    content: {
      maxWidth: '64rem',
      margin: '0 auto',
      textAlign: 'center'
    },
    header: {
      marginBottom: '2rem'
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1.5rem'
    },
    logoIcon: {
      backgroundColor: '#17ab9c',
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '3rem',
      color: 'white'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#4b5563',
      marginBottom: '2rem',
      maxWidth: '32rem',
      margin: '0 auto 2rem auto'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(1rem, 3vw, 1.5rem)',
      marginBottom: 'clamp(1rem, 3vw, 2rem)',
      padding: 'clamp(10px, 2vw, 15px)'
    },
    feature: {
      backgroundColor: '#ffffff',
      padding: 'clamp(1.5rem, 4vw, 2rem)',
      borderRadius: '12px',
      border: '2px solid #f0f0f0',
      transition: 'border-color 0.2s'
    },
    featureIcon: {
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
      marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
      color: '#17ab9c'
    },
    featureTitle: {
      fontWeight: '700',
      color: '#17ab9c',
      marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)',
      fontSize: 'clamp(18px, 4vw, 20px)'
    },
    featureDesc: {
      color: '#666666',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
      lineHeight: '1.6'
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(0.8rem, 3vw, 1rem)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'clamp(20px, 4vw, 30px)',
      maxWidth: '400px',
      margin: '0 auto'
    },
    buttonPrimary: {
      backgroundColor: '#17ab9c',
      color: 'white',
      padding: 'clamp(1rem, 3vw, 1.25rem) clamp(1.5rem, 6vw, 2rem)',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: 'clamp(16px, 4vw, 18px)',
      textDecoration: 'none',
      transition: 'background-color 0.2s',
      cursor: 'pointer',
      border: 'none',
      width: '100%',
      textAlign: 'center',
      minHeight: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonSecondary: {
      backgroundColor: 'white',
      color: '#17ab9c',
      padding: 'clamp(1rem, 3vw, 1.25rem) clamp(1.5rem, 6vw, 2rem)',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: 'clamp(16px, 4vw, 18px)',
      textDecoration: 'none',
      border: '2px solid #17ab9c',
      transition: 'all 0.2s',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'center',
      minHeight: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    notice: {
      marginTop: 'clamp(1rem, 3vw, 2rem)',
      padding: 'clamp(1rem, 3vw, 1.25rem)',
      backgroundColor: '#ffffff',
      border: '2px solid #17ab9c',
      borderRadius: '12px',
      margin: 'clamp(1rem, 3vw, 2rem) clamp(20px, 4vw, 30px) 0'
    },
    noticeText: {
      color: '#17ab9c',
      fontSize: 'clamp(12px, 3vw, 14px)',
      lineHeight: '1.5',
      fontWeight: '600'
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        maxWidth: '100vw',
        width: '98vw',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: 'white',
          color: '#2dd4bf',
          padding: 'clamp(15px, 4vw, 25px) clamp(10px, 3vw, 20px)',
          textAlign: 'center',
          borderBottom: '3px solid #2dd4bf'
        }}>
          {/* Logo */}
          <div style={{ 
            width: '65vw', 
            height: '65vw', 
            maxWidth: '700px',
            maxHeight: '700px',
            minWidth: '250px',
            minHeight: '250px',
            margin: '0 auto clamp(10px, 3vw, 20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
            src={logoGlobalDoctors}
            alt="Global Doctors Logo"
            style={{
              width: '65vw',
              height: 'auto',
              maxWidth: '700px',
              minWidth: '250px',
              marginBottom: '5px'
            }}
            />
          </div>
          
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🛡️</div>
            <h3 style={styles.featureTitle}>Triaje Inteligente</h3>
            <p style={styles.featureDesc}>
              Sistema automatizado de evaluación médica según protocolos profesionales
            </p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>👥</div>
            <h3 style={styles.featureTitle}>Atención Especializada</h3>
            <p style={styles.featureDesc}>
              Acceso directo a especialistas en medicina general, pediatría, ginecología y salud mental
            </p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🧠</div>
            <h3 style={styles.featureTitle}>Consulta Virtual</h3>
            <p style={styles.featureDesc}>
              Videoconsultas seguras desde la comodidad de su hogar
            </p>
          </div>
        </div>

        <div style={styles.buttons}>
          <Link to="/register" style={styles.buttonPrimary}>
            Registrarse
          </Link>
          <Link to="/login" style={styles.buttonSecondary}>
            Iniciar sesión
          </Link>
        </div>

        <div style={styles.notice}>
          <p style={styles.noticeText}>
            <strong>DEMO:</strong> Esta es una demostración funcional de la plataforma Global Doctors para presentación a inversores.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSimple;