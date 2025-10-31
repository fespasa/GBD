import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function PatientInfo() {
  const navigate = useNavigate();
  const { user, currentSpecialty, setPatientInfo } = useApp();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos de Identificación
    name: user?.name || '',
    gender: '',
    birthDate: '',
    documentId: '',
    phone: '',
    email: user?.email || '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Contexto del Paciente
    weight: '',
    height: '',
    allergies: [],
    chronicDiseases: [],
    currentMedications: [],
    surgeries: [],
    familyHistory: '',
    toxicHabits: [],
    
    // Datos Adicionales según el Tipo de Paciente
    reproductiveHealth: {
      currentPregnancy: '',
      pregnancyWeeks: '',
      desiredPregnancy: '',
      contraceptives: '',
      lastMenstrualPeriod: ''
    },
    pediatrics: {
      developmentalDeficiencies: '',
      vaccinationsUpToDate: '',
      perinatalHistory: ''
    },
    geriatrics: {
      functionalAutonomy: '',
      recentFalls: '',
      technicalAids: []
    }
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      currentMedications: prev.currentMedications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      currentMedications: [...prev.currentMedications, { name: '', dose: '', frequency: '', indication: '' }]
    }));
  };

  const removeMedication = (index) => {
    setFormData(prev => ({
      ...prev,
      currentMedications: prev.currentMedications.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
      if (!formData.gender) newErrors.gender = 'El género es obligatorio';
      if (!formData.birthDate) newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
      if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
      if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    }

    if (step === 2) {
      if (!formData.weight || formData.weight <= 0) newErrors.weight = 'El peso es obligatorio y debe ser mayor a 0';
      if (!formData.height || formData.height <= 0) newErrors.height = 'La altura es obligatoria y debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < getTotalSteps()) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTotalSteps = () => {
    let totalSteps = 2; // Paso 1: Identificación, Paso 2: Contexto del Paciente
    
    // Añadir paso adicional según la especialidad
    if (currentSpecialty?.id === 'womens-health') totalSteps += 1;
    if (currentSpecialty?.id === 'pediatrics') totalSteps += 1;
    if (currentSpecialty?.id === 'geriatrics') totalSteps += 1;
    
    return totalSteps;
  };

  const handleSubmit = () => {
    // Guardar información del paciente en el contexto
    setPatientInfo(formData);
    
    // Navegar al triage correspondiente
    navigate(`/triage/${currentSpecialty.id}`);
  };

  const renderStep1 = () => (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
        Datos de Identificación
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Nombre completo *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange(null, 'name', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.name ? '2px solid #ef4444' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.name && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.name}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Sexo asignado al nacer / Identidad de género *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange(null, 'gender', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.gender ? '2px solid #ef4444' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Seleccionar...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro / Prefiero no especificar</option>
          </select>
          {errors.gender && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.gender}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Fecha de nacimiento *
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleInputChange(null, 'birthDate', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.birthDate ? '2px solid #ef4444' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.birthDate && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.birthDate}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Documento de identidad
          </label>
          <input
            type="text"
            value={formData.documentId}
            onChange={(e) => handleInputChange(null, 'documentId', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Teléfono de contacto *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.phone ? '2px solid #ef4444' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.phone && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.phone}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Correo electrónico *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange(null, 'email', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.email}</p>}
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Dirección
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange(null, 'address', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Contacto de emergencia
          </label>
          <input
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange(null, 'emergencyContact', e.target.value)}
            placeholder="Nombre del contacto de emergencia"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Teléfono de emergencia
          </label>
          <input
            type="tel"
            value={formData.emergencyPhone}
            onChange={(e) => handleInputChange(null, 'emergencyPhone', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
        Contexto del Paciente
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Peso (kg) *
          </label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange(null, 'weight', e.target.value)}
            min="1"
            style={{
              width: '100%',
              padding: '12px',
              border: errors.weight ? '2px solid #ef4444' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.weight && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.weight}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Altura (cm) *
          </label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleInputChange(null, 'height', e.target.value)}
            min="1"
            style={{
              width: '100%',
              padding: '12px',
              border: errors.height ? '2px solid #ef4444' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.height && <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.height}</p>}
        </div>
      </div>

      {/* Alergias */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Alergias conocidas
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {['Penicilina', 'Aspirina', 'Látex', 'Frutos secos', 'Mariscos', 'Otras'].map(allergy => (
            <label key={allergy} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={formData.allergies.includes(allergy)}
                onChange={(e) => handleArrayChange('allergies', allergy, e.target.checked)}
              />
              <span style={{ fontSize: '14px' }}>{allergy}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Enfermedades crónicas */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Enfermedades crónicas
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {['Diabetes', 'Hipertensión', 'Asma', 'Cardiopatía', 'Epilepsia', 'Otras'].map(disease => (
            <label key={disease} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={formData.chronicDiseases.includes(disease)}
                onChange={(e) => handleArrayChange('chronicDiseases', disease, e.target.checked)}
              />
              <span style={{ fontSize: '14px' }}>{disease}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Medicación habitual */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
            Medicación habitual (enfatizar anticoagulantes)
          </label>
          <button
            type="button"
            onClick={addMedication}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17ab9c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            + Añadir medicamento
          </button>
        </div>
        
        {formData.currentMedications.map((medication, index) => (
          <div key={index} style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr 1fr 2fr auto', 
            gap: '8px', 
            alignItems: 'end',
            marginBottom: '8px',
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <input
              type="text"
              placeholder="Nombre del medicamento"
              value={medication.name}
              onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <input
              type="text"
              placeholder="Dosis"
              value={medication.dose}
              onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <input
              type="text"
              placeholder="Frecuencia"
              value={medication.frequency}
              onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <input
              type="text"
              placeholder="Indicación"
              value={medication.indication}
              onChange={(e) => handleMedicationChange(index, 'indication', e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <button
              type="button"
              onClick={() => removeMedication(index)}
              style={{
                padding: '8px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Cirugías previas */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Cirugías previas
        </label>
        <textarea
          value={formData.surgeries.join('\n')}
          onChange={(e) => setFormData(prev => ({ ...prev, surgeries: e.target.value.split('\n').filter(s => s.trim()) }))}
          placeholder="Describa las cirugías previas, una por línea"
          rows={3}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Historial familiar */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Historial familiar relevante
        </label>
        <textarea
          value={formData.familyHistory}
          onChange={(e) => handleInputChange(null, 'familyHistory', e.target.value)}
          placeholder="Enfermedades familiares relevantes"
          rows={3}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Hábitos tóxicos */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Hábitos tóxicos
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {['Tabaco', 'Alcohol', 'Drogas recreativas', 'Ninguno'].map(habit => (
            <label key={habit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={formData.toxicHabits.includes(habit)}
                onChange={(e) => handleArrayChange('toxicHabits', habit, e.target.checked)}
              />
              <span style={{ fontSize: '14px' }}>{habit}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (currentSpecialty?.id === 'womens-health') {
      return (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
            Información de Salud Reproductiva
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                ¿Embarazo actual?
              </label>
              <select
                value={formData.reproductiveHealth.currentPregnancy}
                onChange={(e) => handleInputChange('reproductiveHealth', 'currentPregnancy', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
                <option value="no_segura">No estoy segura</option>
              </select>
            </div>

            {formData.reproductiveHealth.currentPregnancy === 'si' && (
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Semanas de gestación
                </label>
                <input
                  type="number"
                  value={formData.reproductiveHealth.pregnancyWeeks}
                  onChange={(e) => handleInputChange('reproductiveHealth', 'pregnancyWeeks', e.target.value)}
                  min="0"
                  max="42"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                ¿Desea quedar embarazada?
              </label>
              <select
                value={formData.reproductiveHealth.desiredPregnancy}
                onChange={(e) => handleInputChange('reproductiveHealth', 'desiredPregnancy', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
                <option value="en_el_futuro">En el futuro</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Método anticonceptivo actual
              </label>
              <input
                type="text"
                value={formData.reproductiveHealth.contraceptives}
                onChange={(e) => handleInputChange('reproductiveHealth', 'contraceptives', e.target.value)}
                placeholder="Ej: Píldora, DIU, preservativo, ninguno"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Fecha de la última menstruación (FUM)
              </label>
              <input
                type="date"
                value={formData.reproductiveHealth.lastMenstrualPeriod}
                onChange={(e) => handleInputChange('reproductiveHealth', 'lastMenstrualPeriod', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    if (currentSpecialty?.id === 'pediatrics') {
      return (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
            Información Pediátrica
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                ¿Existen deficiencias en el desarrollo?
              </label>
              <textarea
                value={formData.pediatrics.developmentalDeficiencies}
                onChange={(e) => handleInputChange('pediatrics', 'developmentalDeficiencies', e.target.value)}
                placeholder="Describir cualquier retraso en el desarrollo motor, cognitivo o del lenguaje"
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                ¿Tiene las vacunas al día?
              </label>
              <select
                value={formData.pediatrics.vaccinationsUpToDate}
                onChange={(e) => handleInputChange('pediatrics', 'vaccinationsUpToDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="si">Sí, todas al día</option>
                <option value="parcial">Algunas pendientes</option>
                <option value="no">No estoy seguro/a</option>
                <option value="no_vacunado">No vacunado</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Antecedentes perinatales
              </label>
              <textarea
                value={formData.pediatrics.perinatalHistory}
                onChange={(e) => handleInputChange('pediatrics', 'perinatalHistory', e.target.value)}
                placeholder="Complicaciones durante el embarazo, parto o período neonatal"
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    if (currentSpecialty?.id === 'geriatrics') {
      return (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
            Información Geriátrica
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Autonomía funcional
              </label>
              <select
                value={formData.geriatrics.functionalAutonomy}
                onChange={(e) => handleInputChange('geriatrics', 'functionalAutonomy', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="independiente">Completamente independiente</option>
                <option value="parcial">Necesita ayuda parcial</option>
                <option value="dependiente">Necesita ayuda total</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                ¿Ha tenido caídas recientes?
              </label>
              <select
                value={formData.geriatrics.recentFalls}
                onChange={(e) => handleInputChange('geriatrics', 'recentFalls', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="no">No</option>
                <option value="si_leve">Sí, sin lesiones</option>
                <option value="si_lesion">Sí, con lesiones leves</option>
                <option value="si_grave">Sí, con lesiones graves</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Ayudas técnicas
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                {['Bastón', 'Andador', 'Silla de ruedas', 'Audífono', 'Gafas', 'Ninguna'].map(aid => (
                  <label key={aid} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={formData.geriatrics.technicalAids.includes(aid)}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          geriatrics: {
                            ...prev.geriatrics,
                            technicalAids: e.target.checked 
                              ? [...prev.geriatrics.technicalAids, aid]
                              : prev.geriatrics.technicalAids.filter(item => item !== aid)
                          }
                        }));
                      }}
                    />
                    <span style={{ fontSize: '14px' }}>{aid}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return null;
    }
  };

  if (!user || !currentSpecialty) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#17ab9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Cargando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#17ab9c' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                Información Previa del Paciente
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                {currentSpecialty?.name} - Paso {currentStep} de {getTotalSteps()}
              </p>
            </div>
            <button
              onClick={() => navigate('/specialties')}
              style={{
                color: '#6b7280',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ backgroundColor: 'white', padding: '0 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: '#e5e7eb'
          }}>
            <div style={{
              height: '4px',
              backgroundColor: '#17ab9c',
              width: `${(currentStep / getTotalSteps()) * 100}%`,
              transition: 'width 0.3s ease-in-out'
            }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px',
            padding: '32px'
          }}>
            {getCurrentStepContent()}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  color: '#6b7280',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentStep === 1 ? 0.5 : 1
                }}
              >
                ← Anterior
              </button>

              <button
                onClick={handleNext}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#17ab9c',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {currentStep === getTotalSteps() ? 'Iniciar Triatge' : 'Siguiente'} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;