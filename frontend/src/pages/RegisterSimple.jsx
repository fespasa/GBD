import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/apiService';

const steps = [
  {
    title: 'Información Personal',
    fields: ['fullName', 'email', 'password', 'birthDate', 'gender', 'phone', 'address']
  },
  {
    title: 'Información Administrativa',
    fields: ['hasMutua', 'mutuaName', 'emergencyContact']
  },
  {
    title: 'Información Médica',
    fields: ['weight', 'height', 'allergies', 'chronicDiseases', 'medications', 'surgeries', 'familyHistory', 'toxicHabits', 'vaccinations', 'specialDiet']
  }
];

function RegisterSimple() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Paso 1: Información personal
    fullName: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
    phone: '',
    address: '',
    
    // Paso 2: Información administrativa  
    hasMutua: '',
    mutuaName: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    
    // Paso 3: Información médica
    weight: '',
    height: '',
    allergies: '',
    chronicDiseases: '',
    medications: '',
    surgeries: '',
    familyHistory: '',
    toxicHabits: '',
    vaccinations: '',
    specialDiet: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (step) => {
    const requiredFields = {
      0: ['fullName', 'email', 'password', 'birthDate', 'gender', 'phone'],
      1: ['hasMutua', 'emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation'],
      2: [] // Información médica es opcional
    };
    
    const required = requiredFields[step] || [];
    return required.every(field => formData[field].trim() !== '');
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    
    try {
      const userData = {
        personalInfo: {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          birthDate: formData.birthDate,
          gender: formData.gender,
          phone: formData.phone,
          address: formData.address
        },
        administrativeInfo: {
          hasMutua: formData.hasMutua === 'yes',
          mutuaName: formData.mutuaName,
          emergencyContact: {
            name: formData.emergencyContactName,
            phone: formData.emergencyContactPhone,
            relation: formData.emergencyContactRelation
          }
        },
        medicalInfo: {
          weight: formData.weight,
          height: formData.height,
          allergies: formData.allergies,
          chronicDiseases: formData.chronicDiseases,
          medications: formData.medications,
          surgeries: formData.surgeries,
          familyHistory: formData.familyHistory,
          toxicHabits: formData.toxicHabits,
          vaccinations: formData.vaccinations,
          specialDiet: formData.specialDiet
        }
      };

      const response = await authService.register(userData);
      
      if (response.success) {
        // Simular login automático después del registro
        login({
          id: response.userId,
          name: formData.fullName,
          email: formData.email
        });
        navigate('/profile-complete');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Nom complet *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="Joan García López"
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Correu electrònic *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="joan@example.com"
            required
          />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Contrasenya *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="Mínim 6 caràcters"
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Data de naixement *</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Gènere *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            style={inputStyle}
            required
          >
            <option value="">Selecciona...</option>
            <option value="home">Hombre</option>
            <option value="dona">Mujer</option>
            <option value="altre">Altre</option>
            <option value="no-especifica">Preferisc no especificar</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Telèfon *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="+34 600 000 000"
            required
          />
        </div>
      </div>
      
      <div>
        <label style={labelStyle}>Adreça</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          style={inputStyle}
          placeholder="Carrer, número, ciutat, codi postal"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label style={labelStyle}>¿Té mútua privada? *</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="hasMutua"
              value="yes"
              checked={formData.hasMutua === 'yes'}
              onChange={handleInputChange}
            />
            Sí
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="hasMutua"
              value="no"
              checked={formData.hasMutua === 'no'}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
      </div>
      
      {formData.hasMutua === 'yes' && (
        <div>
          <label style={labelStyle}>Nom de la mútua</label>
          <select
            name="mutuaName"
            value={formData.mutuaName}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Selecciona...</option>
            <option value="sanitas">Sanitas</option>
            <option value="adeslas">Adeslas</option>
            <option value="asisa">Asisa</option>
            <option value="dkv">DKV</option>
            <option value="mapfre">Mapfre</option>
            <option value="altra">Altra</option>
          </select>
        </div>
      )}
      
      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px', color: '#111827' }}>Contacte d'emergència *</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Nom *</label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Maria García"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Telèfon *</label>
            <input
              type="tel"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="+34 600 000 000"
              required
            />
          </div>
        </div>
        <div style={{ marginTop: '16px' }}>
          <label style={labelStyle}>Relació *</label>
          <select
            name="emergencyContactRelation"
            value={formData.emergencyContactRelation}
            onChange={handleInputChange}
            style={inputStyle}
            required
          >
            <option value="">Selecciona...</option>
            <option value="pare">Pare</option>
            <option value="mare">Mare</option>
            <option value="parella">Parella</option>
            <option value="germa">Germà/na</option>
            <option value="fill">Fill/a</option>
            <option value="amic">Amic/ga</option>
            <option value="altre">Altre</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ color: '#6b7280', marginBottom: '16px' }}>
        Aquesta informació ens ajuda a oferir-li una millor atenció mèdica. Tots els camps són opcionals.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Pes (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="70"
          />
        </div>
        <div>
          <label style={labelStyle}>Alçada (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="175"
          />
        </div>
      </div>
      
      <div>
        <label style={labelStyle}>Al·lèrgies</label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleInputChange}
          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          rows={3}
          placeholder="Pol·len, fruits secs, medicaments..."
        />
      </div>
      
      <div>
        <label style={labelStyle}>Malalties cròniques</label>
        <textarea
          name="chronicDiseases"
          value={formData.chronicDiseases}
          onChange={handleInputChange}
          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          rows={3}
          placeholder="Diabetis, hipertensió, asma..."
        />
      </div>
      
      <div>
        <label style={labelStyle}>Medicació habitual</label>
        <textarea
          name="medications"
          value={formData.medications}
          onChange={handleInputChange}
          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          rows={3}
          placeholder="Nom del medicament, dosi, freqüència..."
        />
      </div>
    </div>
  );

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s ease-in-out',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#17ab9c',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      padding: '32px 16px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          padding: '32px'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Registro
            </h1>
            <p style={{ color: '#6b7280' }}>Complete la información para crear su cuenta</p>
          </div>

          {/* Progress indicator */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {steps.map((step, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: index <= currentStep ? '#17ab9c' : '#e5e7eb',
                    color: index <= currentStep ? 'white' : '#6b7280',
                    fontWeight: '500'
                  }}>
                    {index + 1}
                  </div>
                  <p style={{ fontSize: '12px', marginTop: '8px', textAlign: 'center', color: '#6b7280' }}>
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ 
              marginTop: '16px', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '9999px', 
              height: '8px' 
            }}>
              <div style={{
                backgroundColor: '#17ab9c',
                height: '8px',
                borderRadius: '9999px',
                transition: 'width 0.3s ease-in-out',
                width: `${((currentStep + 1) / steps.length) * 100}%`
              }} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {currentStep === 0 && renderStep1()}
            {currentStep === 1 && renderStep2()}
            {currentStep === 2 && renderStep3()}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                style={{
                  ...secondaryButtonStyle,
                  opacity: currentStep === 0 ? 0.5 : 1,
                  cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Enrere
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  style={{
                    ...primaryButtonStyle,
                    opacity: !validateStep(currentStep) ? 0.5 : 1,
                    cursor: !validateStep(currentStep) ? 'not-allowed' : 'pointer'
                  }}
                >
                  Següent →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !validateStep(currentStep)}
                  style={{
                    ...primaryButtonStyle,
                    opacity: (isLoading || !validateStep(currentStep)) ? 0.5 : 1,
                    cursor: (isLoading || !validateStep(currentStep)) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? 'Registrant...' : 'Registrar-me →'}
                </button>
              )}
            </div>
          </form>

          {/* Back to welcome */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              onClick={() => navigate('/')}
              style={{ 
                color: '#6b7280', 
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ← Tornar a l'inici
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSimple;