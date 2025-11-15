import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TriageEngine from '../components/TriageEngine';

function TriageSimple() {
  const { specialty } = useParams();
  const navigate = useNavigate();

  // Redirección inmediata para salud mental
  useEffect(() => {
    if (specialty === 'mental-health') {
      navigate('/mental-health-form', { replace: true });
      return;
    }
  }, [specialty, navigate]);

  // Si es salud mental, no renderizar nada mientras redirige
  if (specialty === 'mental-health') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
          <div>Redirigiendo a Salud Mental...</div>
        </div>
      </div>
    );
  }

  return <TriageEngine />;
}

export default TriageSimple;