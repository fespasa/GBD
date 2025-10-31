import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function LoginSimple() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDemoLogin = () => {
    login({
      id: 'demo-user',
      name: 'Usuario Demo',
      email: 'demo@globaldoctors.com'
    });
    navigate('/specialties');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    },
    card: {
      maxWidth: '28rem',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px solid #17ab9c',
      padding: '2rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
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
    form: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#17ab9c',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #f0f0f0',
      borderRadius: '12px',
      fontSize: '1rem',
      marginBottom: '1rem',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s'
    },
    button: {
      width: '100%',
      backgroundColor: '#17ab9c',
      color: 'white',
      padding: '1rem 1.5rem',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginBottom: '1rem'
    },
    buttonDemo: {
      width: '100%',
      backgroundColor: 'transparent',
      color: '#17ab9c',
      padding: '1rem 1.5rem',
      border: '2px solid #17ab9c',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    divider: {
      position: 'relative',
      textAlign: 'center',
      margin: '1rem 0'
    },
    dividerLine: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      backgroundColor: '#d1d5db'
    },
    dividerText: {
      backgroundColor: 'white',
      padding: '0 0.5rem',
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    links: {
      marginTop: '1.5rem',
      textAlign: 'center'
    },
    link: {
      color: '#17ab9c',
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    backLink: {
      color: '#6b7280',
      textDecoration: 'none',
      fontSize: '0.875rem',
      cursor: 'pointer'
    },
    notice: {
      marginTop: '1.5rem',
      padding: '0.75rem',
      backgroundColor: '#fef3c7',
      border: '1px solid #fbbf24',
      borderRadius: '0.5rem',
      textAlign: 'center'
    },
    noticeText: {
      color: '#92400e',
      fontSize: '0.75rem',
      margin: 0
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Iniciar Sesión</h1>
          <p style={styles.subtitle}>Acceda a Pocket Hospital</p>
        </div>

        <div style={styles.form}>
          <label style={styles.label}>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Su correo electrónico"
            required
          />

          <label style={styles.label}>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Su contraseña"
            required
          />          <button style={styles.button}>
            Iniciar Sesión
          </button>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>o</span>
        </div>

        <button onClick={handleDemoLogin} style={styles.buttonDemo}>
          Acceso Demo (Sin registro)
        </button>

        <div style={styles.links}>
          <p style={{ margin: '0 0 0.75rem 0', color: '#4b5563', fontSize: '0.875rem' }}>
            ¿No tiene cuenta?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{ ...styles.link, border: 'none', background: 'none' }}
            >
              Registri's aquí
            </button>
          </p>
          
          <button
            onClick={() => navigate('/')}
            style={{ ...styles.backLink, border: 'none', background: 'none' }}
          >
            ← Tornar a l'inici
          </button>
        </div>

        <div style={styles.notice}>
          <p style={styles.noticeText}>
            <strong>DEMO:</strong> Use "Acceso Demo" para una experiencia rápida
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSimple;