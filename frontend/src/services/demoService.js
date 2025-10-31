// Configuración para modo demo sin backend
const DEMO_MODE = true;

// Datos simulados para el modo demo
export const demoData = {
  user: {
    id: 'demo-user-001',
    name: 'Usuario Demo',
    email: 'demo@globaldoctors.com'
  },
  
  consultations: [
    {
      id: 'demo-consultation-001',
      specialty: 'adults',
      triageLevel: 'B',
      message: 'Consulta de nivel moderado'
    }
  ]
};

// API simulada para GitHub Pages
export const demoApiService = {
  async login(credentials) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Login exitoso (DEMO)',
      user: demoData.user
    };
  },

  async getSpecialties() {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      specialties: [
        {
          id: 'adults',
          name: 'Adults',
          description: 'Medicina general para adultos',
          icon: '👨‍⚕️'
        },
        {
          id: 'pediatria', 
          name: 'Pediatria',
          description: 'Atención médica especializada para niños',
          icon: '👶'
        },
        {
          id: 'dona',
          name: 'Dona',
          description: 'Ginecología y salud femenina',
          icon: '👩‍⚕️'
        },
        {
          id: 'salut-mental',
          name: 'Salut Mental',
          description: 'Apoyo psicológico y salud mental',
          icon: '🧠'
        }
      ]
    };
  },

  async getQuestions(specialty) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Preguntas demo simplificadas
    const demoQuestions = {
      adults: [
        {
          id: "adults_q1",
          text: "¿Está inconsciente o no responde?",
          options: ["Sí", "No"],
          level: "A",
          condition: "Sí"
        },
        {
          id: "adults_q2", 
          text: "¿Tiene dificultad severa para respirar o ahogo?",
          options: ["Sí", "No"],
          level: "A",
          condition: "Sí"
        },
        {
          id: "adults_q3",
          text: "¿Tiene fiebre superior a 38.5°C?",
          options: ["Sí", "No"],
          level: "B",
          condition: "Sí"
        }
      ]
    };
    
    return {
      success: true,
      specialty: specialty,
      questions: demoQuestions[specialty] || demoQuestions.adults
    };
  },

  async getNextQuestions(specialty, answers) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // En el demo, simplemente retornar que no hay más preguntas
    // En el backend real, esto filtrarían las preguntas basándose en respuestas
    return {
      success: true,
      questions: [],
      hasMore: false
    };
  },

  async submitTriage(triageData) {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Lógica simplificada para determinar nivel
    let level = 'D';
    if (triageData.answers.some(a => a.response === 'Sí' && a.questionId.includes('q1'))) {
      level = 'A';
    } else if (triageData.answers.some(a => a.response === 'Sí' && a.questionId.includes('q2'))) {
      level = 'A'; 
    } else if (triageData.answers.some(a => a.response === 'Sí' && a.questionId.includes('q3'))) {
      level = 'B';
    }
    
    const messages = {
      A: "🔴 URGENTE: Llame al 112 inmediatamente o acuda a urgencias.",
      B: "🟠 PRIORITARIO: Un profesional se pondrá en contacto hoy mismo.",
      C: "🟡 NORMAL: Consulta en los próximos días.",
      D: "🟢 NO URGENTE: Caso que no requiere atención inmediata."
    };

    return {
      success: true,
      consultation: {
        id: `demo-${Date.now()}`,
        triageLevel: level,
        message: messages[level],
        specialty: triageData.specialty
      }
    };
  },

  async checkStopTriage(specialty, questionId, answer) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simplificado: solo parar si respuesta crítica
    const shouldStop = (questionId.includes('q1') || questionId.includes('q2')) && answer === 'Sí';
    
    return {
      success: true,
      shouldStop: shouldStop,
      level: shouldStop ? 'A' : null
    };
  },

  async getAvailableSlots() {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Generar slots demo
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'].forEach(time => {
          slots.push({
            date: date.toISOString().split('T')[0],
            time: time,
            available: Math.random() > 0.3
          });
        });
      }
    }
    
    return {
      success: true,
      slots: slots.filter(slot => slot.available)
    };
  },

  async bookAppointment(appointmentData) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      appointment: {
        id: `demo-appointment-${Date.now()}`,
        ...appointmentData,
        status: 'confirmed'
      },
      message: 'Cita reservada correctamente (DEMO)'
    };
  },

  async uploadDocuments(consultationId, files) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      files: Array.from(files).map((file, index) => ({
        id: `demo-file-${index}`,
        originalName: file.name,
        size: file.size
      })),
      message: 'Documentos subidos correctamente (DEMO)'
    };
  }
};

export { DEMO_MODE };