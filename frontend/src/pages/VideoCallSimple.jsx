import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function VideoCallSimple() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [doctorName] = useState('Dr. Maria González');

  const { consultation, specialty } = location.state || {};

  useEffect(() => {
    if (!consultation || !user) {
      navigate('/');
      return;
    }

    // Simulate connection process
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [consultation, user, navigate]);

  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate('/results', {
      state: {
        consultation: consultation,
        answers: [],
        questions: []
      }
    });
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  if (!consultation || !user) {
    return null;
  }

  const buttonStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        color: 'white', 
        padding: '16px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0' }}>
            Consulta Virtual - {specialty}
          </h1>
          <p style={{ fontSize: '14px', color: '#d1d5db', margin: 0 }}>
            {isConnecting ? 'Conectando...' : isConnected ? `En llamada - ${formatDuration(callDuration)}` : 'Desconectado'}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🕐</span>
          <span style={{ fontSize: '14px' }}>{formatDuration(callDuration)}</span>
        </div>
      </div>

      {/* Video Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Doctor's video (simulated) */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {isConnecting ? (
            <div style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ 
                width: '64px',
                height: '64px',
                border: '4px solid rgba(255,255,255,0.3)',
                borderTop: '4px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }}></div>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                Conectando con {doctorName}
              </h2>
              <p style={{ color: '#d1d5db' }}>Esperant connexió...</p>
            </div>
          ) : isConnected ? (
            <div style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ 
                width: '128px',
                height: '128px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <span style={{ fontSize: '64px' }}>👨‍⚕️</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>{doctorName}</h2>
              <p style={{ color: '#d1d5db', marginBottom: '24px' }}>Especialista en {specialty}</p>
              <div style={{ 
                backgroundColor: 'rgba(0,0,0,0.3)', 
                borderRadius: '8px', 
                padding: '16px', 
                maxWidth: '400px', 
                margin: '0 auto' 
              }}>
                <p style={{ fontSize: '14px', margin: 0 }}>
                  "Hola {user.name}, he revisado su triaje. Comentemos los síntomas que ha indicado..."
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* User's video (simulated) */}
        <div style={{ 
          position: 'absolute', 
          bottom: '16px', 
          right: '16px', 
          width: '192px', 
          height: '144px', 
          backgroundColor: '#374151', 
          borderRadius: '8px', 
          border: '2px solid white', 
          overflow: 'hidden' 
        }}>
          {videoEnabled ? (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>👤</span>
                <p style={{ fontSize: '14px', margin: 0 }}>{user.name}</p>
              </div>
            </div>
          ) : (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'black', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <span style={{ fontSize: '32px', color: '#6b7280' }}>📷</span>
            </div>
          )}
        </div>

        {/* Connection status overlay */}
        {!isConnected && !isConnecting && (
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                Connexió finalitzada
              </h2>
              <button
                onClick={handleEndCall}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Tornar als resultats
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            style={{
              ...buttonStyle,
              backgroundColor: audioEnabled ? '#4b5563' : '#dc2626',
              color: 'white'
            }}
            title={audioEnabled ? 'Silenciar' : 'Activar àudio'}
          >
            {audioEnabled ? '🎤' : '🔇'}
          </button>

          {/* Video toggle */}
          <button
            onClick={toggleVideo}
            style={{
              ...buttonStyle,
              backgroundColor: videoEnabled ? '#4b5563' : '#dc2626',
              color: 'white'
            }}
            title={videoEnabled ? 'Apagar vídeo' : 'Activar vídeo'}
          >
            {videoEnabled ? '📹' : '📷'}
          </button>

          {/* End call */}
          <button
            onClick={handleEndCall}
            style={{
              ...buttonStyle,
              backgroundColor: '#dc2626',
              color: 'white'
            }}
            title="Finalizar llamada"
          >
            📞
          </button>

          {/* Settings */}
          <button
            style={{
              ...buttonStyle,
              backgroundColor: '#4b5563',
              color: 'white'
            }}
            title="Configuració"
          >
            ⚙️
          </button>
        </div>

        {/* Call info */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p style={{ color: 'white', fontSize: '14px', margin: 0 }}>
            Consulta ID: <code style={{ backgroundColor: '#1f2937', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{consultation?.id}</code>
          </p>
        </div>
      </div>

      {/* Demo notice */}
      <div style={{ backgroundColor: '#eab308', color: '#713f12', textAlign: 'center', padding: '8px 16px' }}>
        <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>
          DEMO: Esta es una simulación de videollamada. En producción sería una llamada real con profesionales médicos.
        </p>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default VideoCallSimple;