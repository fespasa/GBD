import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  Settings,
  User,
  Clock
} from 'lucide-react';

function VideoCall() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [doctorName] = useState('Dr. Maria Gonzàlez');

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

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-black bg-opacity-50 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">
            Consulta Virtual - {specialty}
          </h1>
          <p className="text-sm text-gray-300">
            {isConnecting ? 'Connectant...' : isConnected ? `En trucada - ${formatDuration(callDuration)}` : 'Desconnectat'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{formatDuration(callDuration)}</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Doctor's video (simulated) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center">
          {isConnecting ? (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <h2 className="text-2xl font-semibold mb-2">Connectant amb {doctorName}</h2>
              <p className="text-gray-300">Esperant connexió...</p>
            </div>
          ) : isConnected ? (
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-16 w-16" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{doctorName}</h2>
              <p className="text-gray-300">Especialista en {specialty}</p>
              <div className="mt-6 bg-black bg-opacity-30 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm">
                  "Hola {user.name}, he revisado su triaje. Comentemos los síntomas que ha indicado..."
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* User's video (simulated) */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
          {videoEnabled ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <User className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">{user.name}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <VideoOff className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Connection status overlay */}
        {!isConnected && !isConnecting && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-semibold mb-4">Connexió finalitzada</h2>
              <button
                onClick={handleEndCall}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Tornar als resultats
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black bg-opacity-50 p-6">
        <div className="flex justify-center items-center gap-4">
          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              audioEnabled 
                ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title={audioEnabled ? 'Silenciar' : 'Activar àudio'}
          >
            {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>

          {/* Video toggle */}
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              videoEnabled 
                ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title={videoEnabled ? 'Apagar vídeo' : 'Activar vídeo'}
          >
            {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>

          {/* End call */}
          <button
            onClick={handleEndCall}
            className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            title="Finalitzar trucada"
          >
            <Phone className="h-5 w-5" />
          </button>

          {/* Settings */}
          <button
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition-colors"
            title="Configuració"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Call info */}
        <div className="text-center mt-4">
          <p className="text-white text-sm">
            Consulta ID: <code className="bg-gray-800 px-2 py-1 rounded text-xs">{consultation?.id}</code>
          </p>
        </div>
      </div>

      {/* Demo notice */}
      <div className="bg-yellow-500 text-yellow-900 text-center py-2 px-4">
        <p className="text-sm font-medium">
          DEMO: Aquesta és una simulació de videotrucada. En producció seria una trucada real amb professionals mèdics.
        </p>
      </div>
    </div>
  );
}

export default VideoCall;