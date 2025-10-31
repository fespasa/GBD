import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { questionsData } from './data/questions.js';
import { calculateTriageLevel, shouldStopTriage, filterQuestions, getNextQuestions } from './utils/triage.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar multer para subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Base de datos simulada en memoria
let users = [];
let consultations = [];

// Ruta de inicio
app.get('/', (req, res) => {
  res.json({ message: 'Global Doctors API - Demo de Telemedicina' });
});

// Ruta de registro
app.post('/register', (req, res) => {
  try {
    const { 
      personalInfo, 
      administrativeInfo, 
      medicalInfo 
    } = req.body;

    const user = {
      id: uuidv4(),
      personalInfo,
      administrativeInfo,
      medicalInfo,
      createdAt: new Date()
    };

    users.push(user);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      userId: user.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el registro',
      error: error.message
    });
  }
});

// Ruta de login (simulado)
app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Simulación de login - en producción verificar credenciales
    const user = users.find(u => u.personalInfo.email === email);

    if (user) {
      res.json({
        success: true,
        message: 'Login exitoso',
        user: {
          id: user.id,
          name: user.personalInfo.fullName,
          email: user.personalInfo.email
        }
      });
    } else {
      // Crear usuario simulado para la demo
      const simulatedUser = {
        id: uuidv4(),
        personalInfo: {
          fullName: 'Usuario Demo',
          email: email
        }
      };
      users.push(simulatedUser);

      res.json({
        success: true,
        message: 'Login exitoso',
        user: {
          id: simulatedUser.id,
          name: simulatedUser.personalInfo.fullName,
          email: simulatedUser.personalInfo.email
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el login',
      error: error.message
    });
  }
});

// Obtener preguntas por especialidad
app.get('/form/:specialty', (req, res) => {
  try {
    const { specialty } = req.params;
    
    if (!questionsData[specialty]) {
      return res.status(404).json({
        success: false,
        message: 'Especialidad no encontrada'
      });
    }

    // Obtener preguntas base sin filtrar
    let questions = questionsData[specialty];
    
    // Para especialidades complejas, filtrar preguntas iniciales
    if (specialty === 'dona') {
      // Solo mostrar pregunta de bifurcación inicial y preguntas de info
      questions = questions.filter(q => 
        q.level === 'BRANCH' || 
        (q.level === 'INFO' && !q.dependsOn)
      );
    } else if (specialty === 'pediatria') {
      // Solo mostrar preguntas de información inicial
      questions = questions.filter(q => 
        q.level === 'INFO' || 
        (q.level === 'A' && !q.dependsOn)
      );
    }

    res.json({
      success: true,
      specialty: specialty,
      questions: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener preguntas',
      error: error.message
    });
  }
});

// Obtener siguiente conjunto de preguntas basándose en respuestas anteriores
app.post('/form/:specialty/next', (req, res) => {
  try {
    const { specialty } = req.params;
    const { answers } = req.body;
    
    if (!questionsData[specialty]) {
      return res.status(404).json({
        success: false,
        message: 'Especialidad no encontrada'
      });
    }

    // Obtener todas las preguntas para la especialidad
    let allQuestions = questionsData[specialty];
    
    // Filtrar preguntas según bifurcaciones y dependencias
    const availableQuestions = getNextQuestions(answers, allQuestions, specialty);
    const filteredQuestions = filterQuestions(availableQuestions, answers);
    
    // Excluir preguntas ya respondidas
    const answeredIds = answers.map(a => a.questionId);
    const pendingQuestions = filteredQuestions.filter(q => 
      !answeredIds.includes(q.id)
    );

    res.json({
      success: true,
      questions: pendingQuestions,
      hasMore: pendingQuestions.length > 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener siguientes preguntas',
      error: error.message
    });
  }
});

// Verificar si una respuesta debe terminar el triaje
app.post('/check-stop-triage', (req, res) => {
  try {
    const { specialty, questionId, answer } = req.body;
    
    if (!questionsData[specialty]) {
      return res.status(404).json({
        success: false,
        message: 'Especialidad no encontrada'
      });
    }

    const question = questionsData[specialty].find(q => q.id === questionId);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Pregunta no encontrada'
      });
    }

    const shouldStop = shouldStopTriage(answer, question);

    res.json({
      success: true,
      shouldStop: shouldStop,
      level: shouldStop ? question.level : null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al verificar condición de parada',
      error: error.message
    });
  }
});

// Procesar triaje
app.post('/triage', (req, res) => {
  try {
    const { specialty, answers, userId } = req.body;

    if (!questionsData[specialty]) {
      return res.status(404).json({
        success: false,
        message: 'Especialidad no encontrada'
      });
    }

    // Calcular nivel de triaje
    const triageLevel = calculateTriageLevel(answers, questionsData[specialty]);
    
    // Generar mensaje personalizado según nivel
    const messages = {
      A: "🔴 URGENTE: Llame al 112 inmediatamente o acuda a urgencias.",
      B: "🟠 PRIORITARIO: Un profesional se pondrá en contacto hoy mismo.",
      C: "🟡 NORMAL: Consulta en los próximos días.",
      D: "🟢 NO URGENTE: Caso que no requiere atención inmediata."
    };

    const consultation = {
      id: uuidv4(),
      userId: userId,
      specialty: specialty,
      answers: answers,
      triageLevel: triageLevel,
      message: messages[triageLevel],
      createdAt: new Date()
    };

    consultations.push(consultation);

    res.json({
      success: true,
      consultation: {
        id: consultation.id,
        triageLevel: triageLevel,
        message: messages[triageLevel],
        specialty: specialty
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al procesar triaje',
      error: error.message
    });
  }
});

// Subir documentos
app.post('/upload-documents', upload.array('documents', 5), (req, res) => {
  try {
    const { consultationId } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se han subido archivos'
      });
    }

    // En una aplicación real, aquí guardaríamos los archivos
    const uploadedFiles = files.map(file => ({
      id: uuidv4(),
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      success: true,
      message: 'Documentos subidos correctamente',
      files: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir documentos',
      error: error.message
    });
  }
});

// Obtener horarios disponibles para videollamadas
app.get('/available-slots', (req, res) => {
  try {
    // Simulación de horarios disponibles
    // En producción esto vendría de una base de datos
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Excluir fines de semana
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const dateStr = date.toISOString().split('T')[0];
        
        // Generar slots de ejemplo (en producción verificar disponibilidad real)
        const morningSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
        const afternoonSlots = ['15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];
        
        [...morningSlots, ...afternoonSlots].forEach(time => {
          slots.push({
            date: dateStr,
            time: time,
            available: Math.random() > 0.3 // Simular disponibilidad
          });
        });
      }
    }
    
    res.json({
      success: true,
      slots: slots.filter(slot => slot.available)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener horarios disponibles',
      error: error.message
    });
  }
});

// Reservar cita para videollamada
app.post('/book-appointment', (req, res) => {
  try {
    const { consultationId, phoneNumber, date, time, specialty } = req.body;

    const appointment = {
      id: uuidv4(),
      consultationId: consultationId,
      phoneNumber: phoneNumber,
      date: date,
      time: time,
      specialty: specialty,
      status: 'confirmed',
      createdAt: new Date()
    };

    // En producción, guardar en base de datos
    // appointments.push(appointment);

    res.json({
      success: true,
      appointment: appointment,
      message: 'Cita reservada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al reservar la cita',
      error: error.message
    });
  }
});

// Obtener especialidades disponibles
app.get('/specialties', (req, res) => {
  const specialties = [
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
  ];

  res.json({
    success: true,
    specialties: specialties
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Global Doctors ejecutándose en http://localhost:${PORT}`);
});

export default app;