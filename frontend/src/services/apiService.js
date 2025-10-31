import axios from 'axios';
import { demoApiService, DEMO_MODE } from './demoService.js';

const API_BASE_URL = import.meta.env.PROD ? 'https://your-backend-url.com' : 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth Service
export const authService = {
  async register(userData) {
    if (import.meta.env.PROD) {
      return demoApiService.login(userData); // En producción usar modo demo
    }
    
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      // Fallback a demo si falla la conexión
      console.warn('Backend no disponible, usando modo demo');
      return demoApiService.login(userData);
    }
  },

  async login(credentials) {
    if (import.meta.env.PROD) {
      return demoApiService.login(credentials); // En producción usar modo demo
    }
    
    try {
      const response = await api.post('/login', credentials);
      return response.data;
    } catch (error) {
      // Fallback a demo si falla la conexión
      console.warn('Backend no disponible, usando modo demo');
      return demoApiService.login(credentials);
    }
  }
};

// Función auxiliar para manejar fallback a demo
const withDemoFallback = async (apiCall, demoCall) => {
  if (import.meta.env.PROD) {
    return demoCall();
  }
  
  try {
    return await apiCall();
  } catch (error) {
    console.warn('Backend no disponible, usando modo demo');
    return demoCall();
  }
};

// Triage Service
export const triageService = {
  async getSpecialties() {
    return withDemoFallback(
      async () => {
        const response = await api.get('/specialties');
        return response.data;
      },
      () => demoApiService.getSpecialties()
    );
  },

  async getQuestions(specialty) {
    return withDemoFallback(
      async () => {
        const response = await api.get(`/form/${specialty}`);
        return response.data;
      },
      () => demoApiService.getQuestions(specialty)
    );
  },

  async getNextQuestions(specialty, answers) {
    return withDemoFallback(
      async () => {
        const response = await api.post(`/form/${specialty}/next`, { answers });
        return response.data;
      },
      () => demoApiService.getNextQuestions(specialty, answers)
    );
  },

  async checkStopTriage(specialty, questionId, answer) {
    return withDemoFallback(
      async () => {
        const response = await api.post('/check-stop-triage', {
          specialty,
          questionId,
          answer
        });
        return response.data;
      },
      () => demoApiService.checkStopTriage(specialty, questionId, answer)
    );
  },

  async submitTriage(triageData) {
    return withDemoFallback(
      async () => {
        const response = await api.post('/triage', triageData);
        return response.data;
      },
      () => demoApiService.submitTriage(triageData)
    );
  },

  async uploadDocuments(consultationId, files) {
    return withDemoFallback(
      async () => {
        const formData = new FormData();
        formData.append('consultationId', consultationId);
        
        Array.from(files).forEach(file => {
          formData.append('documents', file);
        });

        const response = await api.post('/upload-documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        return response.data;
      },
      () => demoApiService.uploadDocuments(consultationId, files)
    );
  },

  async getAvailableSlots() {
    return withDemoFallback(
      async () => {
        const response = await api.get('/available-slots');
        return response.data;
      },
      () => demoApiService.getAvailableSlots()
    );
  },

  async bookAppointment(appointmentData) {
    return withDemoFallback(
      async () => {
        const response = await api.post('/book-appointment', appointmentData);
        return response.data;
      },
      () => demoApiService.bookAppointment(appointmentData)
    );
  }
};

export default api;