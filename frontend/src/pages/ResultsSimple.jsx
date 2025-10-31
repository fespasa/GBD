import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logoGlobalDoctors from '../assets/GlobalDoctors.png';

function ResultsSimple() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, resetTriage } = useApp();
  const [phone, setPhone] = useState('');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);

  const { triageResult, answers, patientInfo, specialty, consultation, questions } = location.state || {};

  // Compatibilidad con el sistema anterior
  const result = triageResult || consultation;

  if (!result || !user) {
    navigate('/');
    return null;
  }

  // Información estándar sin mostrar nivel de triage
  const displayInfo = {
    icon: '✅',
    color: '#17ab9c',
    bgColor: '#f0fdfa',
    borderColor: '#5eead4',
    title: 'CONSULTA REBUDA',
    message: 'Ben aviat un metge es posarà en contacte amb vostè'
  };

  const handlePhoneSubmit = () => {
    if (!phone.trim()) {
      alert('Si us plau, introdueixi un número de telèfon');
      return;
    }
    setPhoneSubmitted(true);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src={logoGlobalDoctors}
            alt="Global Doctors Logo"
            style={{
              height: '60px',
              width: 'auto',
              marginBottom: '15px'
            }}
          />
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Especialitat: {result.specialty || specialty}
          </p>
        </div>

        <div className="result-container">
          <div className="result-card" style={{ 
            backgroundColor: displayInfo.bgColor,
            borderColor: displayInfo.borderColor,
            border: `2px solid ${displayInfo.borderColor}`,
            borderRadius: '12px',
            padding: '30px',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <div className="result-icon" style={{ fontSize: '64px', marginBottom: '20px' }}>
              {displayInfo.icon}
            </div>
            <h2 className="result-title" style={{ 
              color: displayInfo.color, 
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              {displayInfo.title}
            </h2>
            {result.caseNumber && (
              <div className="case-number" style={{
                backgroundColor: '#f3f4f6',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <strong style={{ color: '#374151' }}>Número de cas: {result.caseNumber}</strong>
              </div>
            )}
            <p className="result-message" style={{
              fontSize: '16px',
              color: '#374151',
              marginBottom: '25px'
            }}>
              {displayInfo.message}
            </p>

            {/* Formulario para solicitar teléfono */}
            {!phoneSubmitted && (
              <div className="phone-form" style={{ marginTop: '30px' }}>
                <h4 style={{ color: '#17ab9c', marginBottom: '15px' }}>
                  Per contactar amb vostè, necessitem el seu telèfon
                </h4>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Número de telèfon"
                    style={{
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      minWidth: '200px',
                      flex: '1'
                    }}
                  />
                  <button
                    onClick={handlePhoneSubmit}
                    disabled={!phone}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: phone ? '#17ab9c' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      cursor: phone ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            )}

            {phoneSubmitted && (
              <div style={{ marginTop: '20px' }}>
                <p style={{ color: '#16a34a', fontWeight: 'bold', marginBottom: '10px' }}>
                  ✅ Telèfon registrat correctament
                </p>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                  Conservi el número de cas per a futures consultes.
                </p>
              </div>
            )}
          </div>

          {/* Botón para programar videollamada */}
          <div className="video-call-section" style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#17ab9c', marginBottom: '20px' }}>
              Prefereix parlar directament amb un metge?
            </h3>
            <button 
              className="video-call-btn"
              onClick={() => navigate('/video-consultation')}
              style={{
                backgroundColor: '#17ab9c',
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '300px'
              }}
            >
              📹 Programar Videotrucada amb Metge
            </button>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              Disponible 24/7 - Consulta immediata amb professionals certificats
            </p>
          </div>

          <div className="navigation-buttons" style={{ textAlign: 'center' }}>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/')}
              style={{
                backgroundColor: 'white',
                color: '#17ab9c',
                border: '2px solid #17ab9c',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Nova Consulta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsSimple;