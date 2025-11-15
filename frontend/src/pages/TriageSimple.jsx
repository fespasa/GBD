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
    }
  }, [specialty, navigate]);

  // Si es salud mental, mostrar pantalla de carga
  if (specialty === 'mental-health') {
    return null; // No renderizar nada mientras redirige
  }

  return <TriageEngine />;
}

export default TriageSimple;