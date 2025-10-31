import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Brain } from 'lucide-react';

function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo y título */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Heart className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Global Doctors
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plataforma de telemedicina que facilita el triaje médico y la derivación a profesionales especializados
          </p>
        </div>

        {/* Características principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Triaje Inteligente</h3>
            <p className="text-gray-600 text-sm">
              Sistema automatizado de evaluación médica según protocolos profesionales
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Atención Especializada</h3>
            <p className="text-gray-600 text-sm">
              Acceso directo a especialistas en medicina general, pediatría, ginecología y salud mental
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Brain className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Consulta Virtual</h3>
            <p className="text-gray-600 text-sm">
              Videoconsultas seguras desde la comodidad de tu hogar
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Registrar-se
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg border border-gray-200"
          >
            Iniciar sessió
          </Link>
        </div>

        {/* Demo notice */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>DEMO:</strong> Esta es una demostración funcional de la plataforma Global Doctors para presentación a inversores.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;