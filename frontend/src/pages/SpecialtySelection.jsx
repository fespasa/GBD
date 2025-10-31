import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { triageService } from '../services/apiService';
import { ArrowRight, Heart, Baby, User, Brain } from 'lucide-react';

function SpecialtySelection() {
  const navigate = useNavigate();
  const { user, setSpecialty } = useApp();
  const [specialties, setSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    loadSpecialties();
  }, [user, navigate]);

  const loadSpecialties = async () => {
    try {
      const response = await triageService.getSpecialties();
      if (response.success) {
        setSpecialties(response.specialties);
      }
    } catch (error) {
      console.error('Error loading specialties:', error);
      // Fallback to hardcoded specialties
      setSpecialties([
        {
          id: 'adults',
          name: 'Adults',
          description: 'Medicina general per a adults',
          icon: '👨‍⚕️'
        },
        {
          id: 'pediatria',
          name: 'Pediatria',
          description: 'Atenció mèdica especialitzada per a nens',
          icon: '👶'
        },
        {
          id: 'dona',
          name: 'Mujer',
          description: 'Ginecología y salud femenina',
          icon: '👩‍⚕️'
        },
        {
          id: 'salut-mental',
          name: 'Salud Mental',
          description: 'Apoyo psicológico y salud mental',
          icon: '🧠'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const handleStartConsultation = () => {
    if (!selectedSpecialty) return;
    
    setSpecialty(selectedSpecialty);
    navigate(`/triage/${selectedSpecialty.id}`);
  };

  const getSpecialtyIcon = (specialtyId) => {
    const icons = {
      adults: <User className="h-12 w-12" />,
      pediatria: <Baby className="h-12 w-12" />,
      dona: <Heart className="h-12 w-12" />,
      'salut-mental': <Brain className="h-12 w-12" />
    };
    return icons[specialtyId] || <User className="h-12 w-12" />;
  };

  const getSpecialtyColor = (specialtyId) => {
    const colors = {
      adults: 'border-blue-200 hover:border-blue-400 bg-blue-50',
      pediatria: 'border-green-200 hover:border-green-400 bg-green-50',
      dona: 'border-pink-200 hover:border-pink-400 bg-pink-50',
      'salut-mental': 'border-purple-200 hover:border-purple-400 bg-purple-50'
    };
    return colors[specialtyId] || 'border-gray-200 hover:border-gray-400 bg-gray-50';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregant especialitats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Benvingut/da, {user?.name}
          </h1>
          <p className="text-gray-600">
            Seleccioni l'especialitat mèdica per a la seva consulta
          </p>
        </div>

        {/* Specialty Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              onClick={() => handleSpecialtySelect(specialty)}
              className={`
                cursor-pointer transition-all duration-200 rounded-xl border-2 p-6 text-center
                ${selectedSpecialty?.id === specialty.id 
                  ? 'border-blue-500 bg-blue-100 shadow-lg' 
                  : `${getSpecialtyColor(specialty.id)} hover:shadow-md`
                }
              `}
            >
              <div className="flex justify-center mb-4 text-blue-500">
                {getSpecialtyIcon(specialty.id)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {specialty.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {specialty.description}
              </p>
              
              {selectedSpecialty?.id === specialty.id && (
                <div className="mt-4 p-2 bg-blue-500 text-white rounded-lg text-sm">
                  Especialitat seleccionada
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleStartConsultation}
            disabled={!selectedSpecialty}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto text-lg px-8 py-4"
          >
            Iniciar Consulta
            <ArrowRight className="h-5 w-5" />
          </button>
          
          {selectedSpecialty && (
            <p className="mt-4 text-gray-600 text-sm">
              Començarà el procés de triatge per a <strong>{selectedSpecialty.name}</strong>
            </p>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Com funciona el triatge?
          </h3>
          <div className="space-y-2 text-gray-600 text-sm">
            <p>• Respondrà a una sèrie de preguntes mèdiques específiques</p>
            <p>• El sistema avaluarà automàticament el seu cas</p>
            <p>• Rebrà una classificació d'urgència i recomanacions</p>
            <p>• Podrà adjuntar documents mèdics si ho necessita</p>
            <p>• Opcional: simulació de videotrucada amb un professional</p>
          </div>
        </div>

        {/* Logout option */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Tornar a l'inici
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpecialtySelection;