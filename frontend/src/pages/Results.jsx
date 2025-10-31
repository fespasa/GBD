import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { triageService } from '../services/apiService';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  XCircle, 
  Upload, 
  Video, 
  FileText,
  ArrowLeft 
} from 'lucide-react';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, resetTriage } = useApp();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { consultation, answers, questions } = location.state || {};

  if (!consultation || !user) {
    navigate('/');
    return null;
  }

  const getLevelInfo = (level) => {
    const levelInfo = {
      A: {
        icon: <XCircle className="h-12 w-12" />,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        title: 'URGENT'
      },
      B: {
        icon: <AlertCircle className="h-12 w-12" />,
        color: 'text-orange-500', 
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        title: 'PRIORITARI'
      },
      C: {
        icon: <Clock className="h-12 w-12" />,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50', 
        borderColor: 'border-yellow-200',
        title: 'NORMAL'
      },
      D: {
        icon: <CheckCircle className="h-12 w-12" />,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200', 
        title: 'NO URGENT'
      }
    };
    return levelInfo[level] || levelInfo.D;
  };

  const levelInfo = getLevelInfo(consultation.triageLevel);

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

  const handleNewConsultation = () => {
    resetTriage();
    navigate('/specialties');
  };

  const getAnswerSummary = () => {
    if (!answers || !questions) return [];
    
    return answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      return {
        question: question?.text || answer.questionText,
        response: answer.response
      };
    }).filter(item => item.question);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resultats del Triatge
          </h1>
          <p className="text-gray-600">
            Especialitat: {consultation.specialty}
          </p>
        </div>

        {/* Triage Level Result */}
        <div className={`${levelInfo.bgColor} ${levelInfo.borderColor} border-2 rounded-xl p-8 mb-8 text-center`}>
          <div className={`${levelInfo.color} flex justify-center mb-4`}>
            {levelInfo.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            NIVELL {consultation.triageLevel} - {levelInfo.title}
          </h2>
          <p className="text-lg text-gray-800">
            {consultation.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Upload className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold">Adjuntar Documents</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Pugeu informes mèdics, proves o altra documentació rellevant
            </p>
            
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`btn-primary w-full cursor-pointer text-center ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? 'Pujant...' : 'Seleccionar Arxius'}
            </label>

            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Arxius pujats:
                </p>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      {file.originalName}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Video className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold">Videotrucada</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Connecti amb un professional mèdic per a una consulta virtual
            </p>
            <button
              onClick={handleVideoCall}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full"
            >
              Iniciar Videotrucada
            </button>
          </div>
        </div>

        {/* Answer Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Resum de Respostes</h3>
          <div className="space-y-3">
            {getAnswerSummary().map((item, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                <p className="font-medium text-gray-900 text-sm">
                  {item.question}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Resposta: <span className="font-medium">{item.response}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Informació Adicional</h3>
          <div className="space-y-3 text-gray-600 text-sm">
            <p>• El seu cas ha estat registrat amb l'ID: <code className="bg-gray-100 px-2 py-1 rounded">{consultation.id}</code></p>
            <p>• En cas d'urgència (Nivell A), contacti immediatament amb el 112</p>
            <p>• Guardi aquest resum per a futures consultes</p>
            <p>• Un professional mèdic revisarà el seu cas segons la prioritat assignada</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/specialties')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Tornar a especialitats
          </button>

          <button
            onClick={handleNewConsultation}
            className="btn-primary"
          >
            Nova Consulta
          </button>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-yellow-800 text-sm">
            <strong>DEMO:</strong> Aquesta és una simulació. En producció, els professionals mèdics reals rebrien aquesta informació.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Results;