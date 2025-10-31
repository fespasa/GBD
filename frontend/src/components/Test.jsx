import React from 'react';
import logoGlobalDoctors from '../assets/GlobalDoctors.png';

function Test() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <img 
          src={logoGlobalDoctors}
          alt="Global Doctors Logo"
          style={{ height: '40px', width: 'auto', marginRight: '15px' }}
        />
        <h1 style={{ color: '#333', fontSize: '2rem', margin: 0 }}>
          Test Page
        </h1>
      </div>
      <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '1rem' }}>
        Si pots veure aquest text, React està funcionant correctament!
      </p>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '1rem'
      }}>
        <h2 style={{ color: '#3b82f6', marginBottom: '1rem' }}>Estats dels servidors:</h2>
        <ul style={{ color: '#374151' }}>
          <li>✅ React + Vite: Funcionant</li>
          <li>✅ Backend Express: http://localhost:3001</li>
          <li>✅ Frontend: http://localhost:5173</li>
        </ul>
      </div>
      <button 
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => window.location.href = '/'}
      >
        Anar a l'aplicació principal  
      </button>
    </div>
  );
}

export default Test;