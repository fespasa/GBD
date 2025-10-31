import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { authService } from '../services/apiService';
import { Mail, Lock, ArrowRight } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authService.login(formData);
      
      if (response.success) {
        login(response.user);
        navigate('/specialties');
      } else {
        setError(response.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Login automático para la demo
    login({
      id: 'demo-user',
      name: 'Usuario Demo',
      email: 'demo@globaldoctors.com'
    });
    navigate('/specialties');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sessió</h1>
            <p className="text-gray-600">Accedeixi al seu compte de Global Doctors</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Correu electrònic
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="el-seu-correu@example.com"
                required
              />
            </div>

            <div>
              <label className="form-label flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Contrasenya
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="La seva contrasenya"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {isLoading ? 'Iniciant sessió...' : 'Iniciar Sessió'}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Demo access */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">o</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Acceso Demo (Sin registro)
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-600 text-sm">
              ¿No té compte?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Registri's aquí
              </button>
            </p>
            
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Tornar a l'inici
            </button>
          </div>

          {/* Demo notice */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-xs text-center">
              <strong>DEMO:</strong> Utilitzi "Accés Demo" per a una experiència ràpida
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;