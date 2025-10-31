import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function ProfileComplete() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    bloodType: '',
    allergies: '',
    previousOperations: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: '',
    profilePhoto: null
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iríamos guardando el perfil completo
    console.log('Perfil completo:', formData);
    // Por ahora redirigir a especialidades
    navigate('/specialties');
  };

  const handleSkip = () => {
    navigate('/specialties');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
      padding: 'clamp(10px, 3vw, 20px)'
    },
    card: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: 'clamp(10px, 3vw, 20px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden'
    },
    header: {
      backgroundColor: '#2dd4bf',
      color: 'white',
      padding: 'clamp(30px, 6vw, 40px)',
      textAlign: 'center'
    },
    title: {
      fontSize: 'clamp(24px, 5vw, 32px)',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: 'clamp(14px, 3vw, 16px)',
      opacity: 0.9
    },
    content: {
      padding: 'clamp(20px, 5vw, 40px)'
    },
    section: {
      marginBottom: 'clamp(24px, 5vw, 32px)'
    },
    sectionTitle: {
      fontSize: 'clamp(18px, 4vw, 20px)',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '16px',
      paddingBottom: '8px',
      borderBottom: '2px solid #e5e7eb'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px'
    },
    gridHalf: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    label: {
      display: 'block',
      fontSize: 'clamp(14px, 3vw, 16px)',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 16px)',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s'
    },
    textarea: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 16px)',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
      boxSizing: 'border-box',
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    select: {
      width: '100%',
      padding: 'clamp(12px, 3vw, 16px)',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
      boxSizing: 'border-box',
      backgroundColor: 'white'
    },
    photoSection: {
      textAlign: 'center'
    },
    photoPreview: {
      width: 'clamp(100px, 20vw, 150px)',
      height: 'clamp(100px, 20vw, 150px)',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '4px solid #e5e7eb',
      marginBottom: '16px'
    },
    photoPlaceholder: {
      width: 'clamp(100px, 20vw, 150px)',
      height: 'clamp(100px, 20vw, 150px)',
      borderRadius: '50%',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'clamp(40px, 8vw, 60px)',
      color: '#9ca3af',
      margin: '0 auto 16px',
      border: '4px solid #e5e7eb'
    },
    fileInput: {
      display: 'none'
    },
    photoButton: {
      backgroundColor: '#2dd4bf',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginTop: '32px'
    },
    buttonPrimary: {
      backgroundColor: '#2dd4bf',
      color: 'white',
      padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
      border: 'none',
      borderRadius: '8px',
      fontSize: 'clamp(16px, 4vw, 18px)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    note: {
      backgroundColor: '#f0f9ff',
      border: '1px solid #0ea5e9',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '24px'
    },
    noteText: {
      color: '#0369a1',
      fontSize: 'clamp(12px, 3vw, 14px)',
      margin: 0,
      lineHeight: '1.4'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Completa tu Perfil</h1>
          <p style={styles.subtitle}>
            Ayúdanos a brindarte una atención más personalizada
          </p>
        </div>

        <div style={styles.content}>
          <form onSubmit={handleSubmit}>
            {/* Foto de Perfil */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📸 Foto de Perfil</h3>
              <div style={styles.photoSection}>
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    style={styles.photoPreview} 
                  />
                ) : (
                  <div style={styles.photoPlaceholder}>
                    👤
                  </div>
                )}
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={styles.fileInput}
                />
                <label htmlFor="profilePhoto">
                  <button 
                    type="button" 
                    style={styles.photoButton}
                    onClick={() => document.getElementById('profilePhoto').click()}
                  >
                    {photoPreview ? 'Cambiar Foto' : 'Subir Foto'}
                  </button>
                </label>
              </div>
            </div>

            {/* Información Física */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📏 Información Física</h3>
              <div style={styles.gridHalf}>
                <div>
                  <label style={styles.label}>Peso (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="70"
                    min="1"
                    max="300"
                  />
                </div>
                <div>
                  <label style={styles.label}>Altura (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="170"
                    min="50"
                    max="250"
                  />
                </div>
              </div>
            </div>

            {/* Información Médica */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🩸 Información Médica</h3>
              <div>
                <label style={styles.label}>Grupo Sanguíneo</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  style={styles.select}
                >
                  <option value="">Selecciona tu grupo sanguíneo</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="no-se">No lo sé</option>
                </select>
              </div>
            </div>

            {/* Alergias */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>⚠️ Alergias</h3>
              <div>
                <label style={styles.label}>
                  Alergias conocidas (medicamentos, alimentos, etc.)
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Describe cualquier alergia conocida o escribe 'Ninguna'"
                />
              </div>
            </div>

            {/* Operaciones Previas */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🏥 Operaciones Previas</h3>
              <div>
                <label style={styles.label}>
                  Cirugías u operaciones anteriores
                </label>
                <textarea
                  name="previousOperations"
                  value={formData.previousOperations}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Describe operaciones previas con fecha aproximada o escribe 'Ninguna'"
                />
              </div>
            </div>

            {/* Medicaciones */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>💊 Medicaciones Actuales</h3>
              <div>
                <label style={styles.label}>
                  Medicamentos que tomas regularmente
                </label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Lista los medicamentos que tomas actualmente o escribe 'Ninguno'"
                />
              </div>
            </div>

            {/* Contacto de Emergencia */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🆘 Contacto de Emergencia</h3>
              <div style={styles.gridHalf}>
                <div>
                  <label style={styles.label}>Nombre del contacto</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Nombre y relación"
                  />
                </div>
                <div>
                  <label style={styles.label}>Teléfono de emergencia</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="+34 123 456 789"
                  />
                </div>
              </div>
            </div>

            <div style={styles.note}>
              <p style={styles.noteText}>
                ℹ️ <strong>Privacidad:</strong> Toda esta información está protegida y solo será 
                utilizada para brindarte una mejor atención médica. Puedes modificarla en cualquier momento.
              </p>
            </div>

            <div style={styles.buttons}>
              <button type="submit" style={styles.buttonPrimary}>
                Guardar Perfil
              </button>
              <button type="button" onClick={handleSkip} style={styles.buttonSecondary}>
                Completar más tarde
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileComplete;