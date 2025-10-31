import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { triageService } from '../services/apiService';

function ResultsSimple() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, resetTriage } = useApp();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const { consultation, answers, questions } = location.state || {};

  if (!consultation || !user) {
    navigate('/');
    return null;
  }

  const getDisplayInfo = (level) => {
    // Para mostrar al paciente - NO revelamos el nivel de urgencia
    if (level === 'A') {
      return {
        icon: '🚨',
        color: '#dc2626',
        bgColor: '#fef2f2',
        borderColor: '#fecaca',
        title: 'ATENCIÓN URGENTE REQUERIDA',
        message: 'Su consulta requiere atención médica inmediata. Por favor, llame al 112 o acuda a urgencias ahora mismo.'
      };
    } else {
      return {
        icon: '✅',
        color: '#059669',
        bgColor: '#f0fdfa',
        borderColor: '#5eead4',
        title: 'CONSULTA RECIBIDA',
        message: 'En breve un personal sanitario se pondrá en contacto con usted'
      };
    }
  };

  const displayInfo = getDisplayInfo(consultation.triageLevel);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const response = await triageService.uploadDocuments(consultation.id, files);
      
      if (response.success) {
        setUploadedFiles(prev => [...prev, ...response.files]);
      } else {
        alert('Error al subir los documentos');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error al subir los documentos');
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoCall = () => {
    navigate('/video-call', { 
      state: { 
        consultation: consultation,
        specialty: consultation.specialty 
      } 
    });
  };

  const handleWaitForContact = () => {
    if (!phoneNumber.trim()) {
      alert('Por favor, introduzca un número de teléfono');
      return;
    }
    
    setSelectedOption('wait');
  };

  const handleScheduleCall = () => {
    if (!phoneNumber.trim()) {
      alert('Por favor, introduzca un número de teléfono');
      return;
    }
    
    // Navegar a la pantalla de programación de citas
    navigate('/schedule-call', {
      state: {
        consultation: consultation,
        phoneNumber: phoneNumber,
        specialty: consultation.specialty
      }
    });
  };

  const handleNewConsultation = () => {
    resetTriage();
    navigate('/specialties');
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    textAlign: 'center',
    display: 'inline-block',
    textDecoration: 'none'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '32px 16px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px', color: 'white' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Resultats del Triatge
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Especialidad: {consultation.specialty}
          </p>
        </div>

        {/* Triage Result */}
        <div style={{
          backgroundColor: displayInfo.bgColor,
          border: `2px solid ${displayInfo.borderColor}`,
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {displayInfo.icon}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            {displayInfo.title}
          </h2>
          <p style={{ fontSize: '18px', color: displayInfo.color, fontWeight: '500' }}>
            {displayInfo.message}
          </p>
        </div>

        {/* Options for Level A (Urgent) */}
        {consultation.triageLevel === 'A' && (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '32px', 
            marginBottom: '32px',
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '72px', marginBottom: '24px' }}>🚨</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>
              ACCIÓN INMEDIATA REQUERIDA
            </h3>
            <p style={{ fontSize: '16px', color: '#111827', marginBottom: '24px', lineHeight: '1.5' }}>
              Su consulta indica que necesita atención médica urgente.<br/>
              <strong>Por favor, llame al 112 ahora mismo o acuda al centro de urgencias más cercano.</strong>
            </p>
            <div style={{ 
              backgroundColor: '#fef2f2', 
              border: '2px solid #fecaca',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', margin: '0 0 8px 0' }}>
                📞 112
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Emergencias médicas - Disponible 24 horas
              </p>
            </div>
          </div>
        )}

        {/* Options for Levels B, C, D (Non-urgent) */}
        {consultation.triageLevel !== 'A' && (
          <div>
            {/* Mensaje de confirmación para "Esperar llamada" */}
            {selectedOption === 'wait' && (
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '32px', 
                marginBottom: '32px',
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', marginBottom: '16px' }}>
                  SOLICITUD REGISTRADA
                </h3>
                <p style={{ fontSize: '18px', color: '#111827', marginBottom: '16px', lineHeight: '1.6' }}>
                  <strong>En breve un personal sanitario se pondrá en contacto con usted</strong>
                </p>
                <div style={{ 
                  backgroundColor: '#f0fdfa', 
                  border: '2px solid #5eead4',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <p style={{ fontSize: '16px', fontWeight: '500', color: '#059669', margin: '0 0 8px 0' }}>
                    📞 {phoneNumber}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    Le llamaremos a este número en las próximas horas
                  </p>
                </div>
                <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>
                  Puede cerrar esta ventana. Si necesita urgencia, llame al 112.
                </p>
              </div>
            )}

            {/* Formulario de contacto - Solo mostrar si no se ha seleccionado "wait" */}
            {selectedOption !== 'wait' && (
              <div>
                {/* Contact Options */}
                <div style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '16px', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '24px', 
                  marginBottom: '24px' 
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                    ¿Cómo desea que le contactemos?
                  </h3>
                  
                  {/* Phone Number Input */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#374151',
                      marginBottom: '8px' 
                    }}>
                      Número de teléfono de contacto
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Ej: +34 612 345 678"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#059669'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>

                  {/* Contact Options */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: consultation.triageLevel === 'C' || consultation.triageLevel === 'D' ? 'repeat(2, 1fr)' : '1fr',
                    gap: '16px' 
                  }}>
                    {/* Wait for Contact Option */}
                    <button
                      onClick={handleWaitForContact}
                      disabled={!phoneNumber.trim()}
                      style={{
                        ...primaryButtonStyle,
                        width: '100%',
                        backgroundColor: '#059669',
                        opacity: !phoneNumber.trim() ? 0.5 : 1,
                        cursor: !phoneNumber.trim() ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '16px'
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>📞</span>
                      <span>Esperar llamada</span>
                    </button>

                    {/* Schedule Video Call Option - Only for levels C and D */}
                    {(consultation.triageLevel === 'C' || consultation.triageLevel === 'D') && (
                      <button
                        onClick={handleScheduleCall}
                        disabled={!phoneNumber.trim()}
                        style={{
                          ...primaryButtonStyle,
                          width: '100%',
                          backgroundColor: '#2563eb',
                          opacity: !phoneNumber.trim() ? 0.5 : 1,
                          cursor: !phoneNumber.trim() ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '16px'
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>📹</span>
                        <span>Programar videollamada</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* File Upload */}
                <div style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '16px', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '24px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '24px', marginRight: '12px' }}>📎</span>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Adjuntar Documentos (Opcional)</h3>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
                    Suba informes médicos, pruebas u otra documentación relevante
                  </p>
                  
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    style={{
                      ...primaryButtonStyle,
                      width: '100%',
                      cursor: isUploading ? 'not-allowed' : 'pointer',
                      opacity: isUploading ? 0.5 : 1
                    }}
                  >
                    {isUploading ? 'Subiendo...' : 'Seleccionar Archivos'}
                  </label>

                  {uploadedFiles.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Archivos subidos:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#6b7280' }}>
                            <span style={{ marginRight: '8px' }}>📄</span>
                            {file.originalName}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional Information */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px', 
          marginBottom: '32px' 
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Información Adicional</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#6b7280', fontSize: '14px' }}>
            <p>• Su caso ha sido registrado con el ID: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{consultation.id}</code></p>
            <p>• Guarde este número de consulta para futuras referencias</p>
            {consultation.triageLevel !== 'A' && (
              <p>• Un profesional médico revisará su caso y se pondrá en contacto con usted</p>
            )}
            <p>• En caso de empeoramiento de síntomas, no dude en contactar con el 112</p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/specialties')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              opacity: 0.9
            }}
          >
            ← Volver a especialidades
          </button>

          <button
            onClick={handleNewConsultation}
            style={{
              ...primaryButtonStyle,
              backgroundColor: 'white',
              color: '#3b82f6',
              fontWeight: '600'
            }}
          >
            Nueva Consulta
          </button>
        </div>

        {/* Demo Notice */}
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#fefce8', 
          border: '1px solid #fde68a', 
          borderRadius: '8px', 
          textAlign: 'center' 
        }}>
          <p style={{ color: '#92400e', fontSize: '14px', margin: 0 }}>
            <strong>DEMO:</strong> Esta es una simulación. En producción, los profesionales médicos reales recibirían esta información.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultsSimple;