import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
};

export const triageService = {
  getSpecialties: async () => {
    const response = await api.get('/specialties');
    return response.data;
  },

  getQuestions: async (specialty) => {
    const response = await api.get(`/form/${specialty}`);
    return response.data;
  },

  submitTriage: async (triageData) => {
    const response = await api.post('/triage', triageData);
    return response.data;
  },

  uploadDocuments: async (consultationId, files) => {
    const formData = new FormData();
    formData.append('consultationId', consultationId);
    
    files.forEach((file, index) => {
      formData.append('documents', file);
    });

    const response = await api.post('/upload-documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
};

export default api;