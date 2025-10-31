import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/apiService';
import { ArrowLeft, ArrowRight, User, Calendar, Phone, MapPin, Users, Heart, Pill, Activity } from 'lucide-react';

const steps = [
  {
    title: 'Informació Personal',
    icon: <User className="h-6 w-6" />,
    fields: ['fullName', 'email', 'password', 'birthDate', 'gender', 'phone', 'address']
  },
  {
    title: 'Informació Administrativa',
    icon: <Users className="h-6 w-6" />,
    fields: ['hasMutua', 'mutuaName', 'emergencyContact']
  },
  {
    title: 'Informació Mèdica',
    icon: <Heart className="h-6 w-6" />,
    fields: ['weight', 'height', 'allergies', 'chronicDiseases', 'medications', 'surgeries', 'familyHistory', 'toxicHabits', 'vaccinations', 'specialDiet']
  }
];

function Register() {
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
        navigate('/specialties');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Nom complet *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Joan García López"
            required
          />
        </div>
        <div>
          <label className="form-label">Correu electrònic *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="joan@example.com"
            required
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Contrasenya *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Mínim 6 caràcters"
            required
          />
        </div>
        <div>
          <label className="form-label">Data de naixement *</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Gènere *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="form-input"
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
          <label className="form-label">Telèfon *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input"
            placeholder="+34 600 000 000"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="form-label">Adreça</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Carrer, número, ciutat, codi postal"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="form-label">¿Té mútua privada? *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="hasMutua"
              value="yes"
              checked={formData.hasMutua === 'yes'}
              onChange={handleInputChange}
              className="mr-2"
            />
            Sí
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hasMutua"
              value="no"
              checked={formData.hasMutua === 'no'}
              onChange={handleInputChange}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>
      
      {formData.hasMutua === 'yes' && (
        <div>
          <label className="form-label">Nom de la mútua</label>
          <select
            name="mutuaName"
            value={formData.mutuaName}
            onChange={handleInputChange}
            className="form-input"
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
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Contacte d'emergència *</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Nom *</label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Maria García"
              required
            />
          </div>
          <div>
            <label className="form-label">Telèfon *</label>
            <input
              type="tel"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="+34 600 000 000"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="form-label">Relació *</label>
          <select
            name="emergencyContactRelation"
            value={formData.emergencyContactRelation}
            onChange={handleInputChange}
            className="form-input"
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
    <div className="space-y-6">
      <p className="text-gray-600 mb-4">
        Aquesta informació ens ajuda a oferir-li una millor atenció mèdica. Tots els camps són opcionals.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Pes (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="form-input"
            placeholder="70"
          />
        </div>
        <div>
          <label className="form-label">Alçada (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            className="form-input"
            placeholder="175"
          />
        </div>
      </div>
      
      <div>
        <label className="form-label">Al·lèrgies</label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleInputChange}
          className="form-input"
          rows={3}
          placeholder="Pol·len, fruits secs, medicaments..."
        />
      </div>
      
      <div>
        <label className="form-label">Malalties cròniques</label>
        <textarea
          name="chronicDiseases"
          value={formData.chronicDiseases}
          onChange={handleInputChange}
          className="form-input"
          rows={3}
          placeholder="Diabetis, hipertensió, asma..."
        />
      </div>
      
      <div>
        <label className="form-label">Medicació habitual</label>
        <textarea
          name="medications"
          value={formData.medications}
          onChange={handleInputChange}
          className="form-input"
          rows={3}
          placeholder="Nom del medicament, dosi, freqüència..."
        />
      </div>
      
      <div>
        <label className="form-label">Cirurgies prèvies</label>
        <textarea
          name="surgeries"
          value={formData.surgeries}
          onChange={handleInputChange}
          className="form-input"
          rows={2}
          placeholder="Tipus de cirurgia i any..."
        />
      </div>
      
      <div>
        <label className="form-label">Antecedentes familiares</label>
        <textarea
          name="familyHistory"
          value={formData.familyHistory}
          onChange={handleInputChange}
          className="form-input"
          rows={3}
          placeholder="Malalties hereditàries en la família..."
        />
      </div>
      
      <div>
        <label className="form-label">Hàbits tòxics</label>
        <textarea
          name="toxicHabits"
          value={formData.toxicHabits}
          onChange={handleInputChange}
          className="form-input"
          rows={2}
          placeholder="Tabac, alcohol, altres substàncies..."
        />
      </div>
      
      <div>
        <label className="form-label">Vacunacions</label>
        <textarea
          name="vaccinations"
          value={formData.vaccinations}
          onChange={handleInputChange}
          className="form-input"
          rows={2}
          placeholder="Vacunes rebudes recentment..."
        />
      </div>
      
      <div>
        <label className="form-label">Dieta especial</label>
        <input
          type="text"
          name="specialDiet"
          value={formData.specialDiet}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Vegetariana, sin gluten, sin lactosa..."
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Registre</h1>
            <p className="text-gray-600">Completi la informació per crear el seu compte</p>
          </div>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentStep 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  <p className="text-xs mt-2 text-center">{step.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {currentStep === 0 && renderStep1()}
            {currentStep === 1 && renderStep2()}
            {currentStep === 2 && renderStep3()}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-50 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Enrere
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className="btn-primary disabled:opacity-50 flex items-center gap-2"
                >
                  Següent
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !validateStep(currentStep)}
                  className="btn-primary disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? 'Registrant...' : 'Registrar-me'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              )}
            </div>
          </form>

          {/* Back to welcome */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Tornar a l'inici
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;