/**
 * Calcula el nivel de triaje basado en las respuestas del usuario
 * Sigue el protocolo SET con parada temprana en nivel A
 */
export function calculateTriageLevel(answers, questions) {
  let currentLevel = 'D'; // Empezamos con el nivel menos grave
  
  for (const answer of answers) {
    // Encontrar la pregunta correspondiente
    const question = questions.find(q => q.id === answer.questionId);
    
    if (!question || question.level === 'INFO' || question.level === 'BRANCH') continue;
    
    // Verificar si la respuesta coincide con la condición que activa el nivel
    let conditionMet = false;
    
    if (question.condition) {
      if (Array.isArray(question.condition)) {
        // Múltiples condiciones posibles
        conditionMet = question.condition.includes(answer.response);
      } else if (question.condition === 'any_text') {
        // Cualquier texto no vacío
        conditionMet = answer.response && answer.response.trim().length > 0;
      } else if (question.condition.startsWith('>')) {
        // Condición numérica (ej: ">60")
        const threshold = parseInt(question.condition.substring(1));
        const responseValue = parseInt(answer.response);
        conditionMet = !isNaN(responseValue) && responseValue > threshold;
      } else {
        // Condición exacta
        conditionMet = answer.response === question.condition;
      }
    }
    
    if (conditionMet) {
      const questionLevel = question.level;
      
      // Aplicar la lógica de priorización: A > B > C > D
      if (questionLevel === 'A') {
        return 'A'; // Si encontramos nivel A, retornamos inmediatamente
      } else if (questionLevel === 'B' && currentLevel !== 'A') {
        currentLevel = 'B';
      } else if (questionLevel === 'C' && !['A', 'B'].includes(currentLevel)) {
        currentLevel = 'C';
      }
      // El nivel D no cambia el currentLevel si ya hay algo más grave
    }
  }
  
  return currentLevel;
}

/**
 * Verifica si una respuesta específica debe terminar el triaje inmediatamente
 */
export function shouldStopTriage(answer, question) {
  if (!question || !question.condition || !question.level) {
    return false;
  }
  
  // Verificar si la pregunta tiene la propiedad stopOnYes
  if (!question.stopOnYes) {
    return false;
  }
  
  // Verificar si la respuesta coincide con la condición
  let conditionMet = false;
  
  if (Array.isArray(question.condition)) {
    conditionMet = question.condition.includes(answer);
  } else if (question.condition === 'any_text') {
    conditionMet = answer && answer.trim().length > 0;
  } else if (question.condition.startsWith('>')) {
    const threshold = parseInt(question.condition.substring(1));
    const responseValue = parseInt(answer);
    conditionMet = !isNaN(responseValue) && responseValue > threshold;
  } else {
    conditionMet = answer === question.condition;
  }
  
  // Si la condición se cumple y debe parar, retornar verdadero
  return conditionMet && question.stopOnYes;
}

/**
 * Filtra las preguntas que deben mostrarse basándose en respuestas anteriores
 */
export function filterQuestions(questions, answers) {
  const filteredQuestions = [];
  
  for (const question of questions) {
    let shouldShow = true;
    
    // Verificar dependencias condicionales
    if (question.dependsOn && question.showIf) {
      const dependentAnswer = answers.find(a => a.questionId === question.dependsOn);
      
      if (dependentAnswer) {
        if (Array.isArray(question.showIf)) {
          shouldShow = question.showIf.includes(dependentAnswer.response);
        } else {
          shouldShow = dependentAnswer.response === question.showIf;
        }
      } else {
        shouldShow = false; // No se ha respondido la pregunta dependiente
      }
    }
    
    if (shouldShow) {
      filteredQuestions.push(question);
    }
  }
  
  return filteredQuestions;
}

/**
 * Determina el siguiente conjunto de preguntas basándose en la lógica de bloques
 */
export function getNextQuestions(answers, questions, specialty) {
  // Para especialidades con bifurcaciones (salud de la mujer)
  if (specialty === 'dona') {
    const branchAnswer = answers.find(a => a.questionId === 'dona_branch');
    if (branchAnswer) {
      const branch = getBranchFromAnswer(branchAnswer.response);
      return questions.filter(q => 
        !q.branch || 
        q.branch === branch || 
        q.level === 'BRANCH' || 
        q.level === 'INFO'
      );
    }
  }
  
  return questions;
}

/**
 * Convierte la respuesta de bifurcación a nombre de rama
 */
function getBranchFromAnswer(answer) {
  switch (answer) {
    case 'Embarazada':
      return 'embarazada';
    case 'Puérpera (postparto hasta 6 semanas)':
      return 'puerpera';
    case 'Otras consultas ginecológicas':
      return 'ginecologica';
    default:
      return null;
  }
}

/**
 * Valida que todas las respuestas requeridas estén presentes
 */
export function validateAnswers(answers, questions) {
  const requiredQuestions = questions.filter(q => q.level !== 'INFO');
  const answeredQuestions = answers.map(a => a.questionId);
  
  for (const question of requiredQuestions) {
    if (!answeredQuestions.includes(question.id)) {
      return {
        valid: false,
        missing: question.id,
        message: `Falta responder la pregunta: ${question.text}`
      };
    }
  }
  
  return { valid: true };
}

/**
 * Obtiene el mensaje personalizado según el nivel de triaje
 */
export function getTriageMessage(level, specialty) {
  const baseMessages = {
    A: "🔴 URGENTE: Llame al 112 inmediatamente o acuda a urgencias.",
    B: "🟠 PRIORITARIO: Un profesional se pondrá en contacto hoy mismo.",
    C: "🟡 NORMAL: Consulta en los próximos días.",
    D: "🟢 NO URGENTE: Caso que no requiere atención inmediata."
  };
  
  // Mensajes específicos por especialidad si es necesario
  const specialtyMessages = {
    pediatria: {
      A: "🔴 URGENTE: Llame al 112 inmediatamente o acuda a urgencias pediátricas.",
      B: "🟠 PRIORITARIO: Un pediatra se pondrá en contacto hoy mismo."
    },
    dona: {
      A: "🔴 URGENTE: Acuda inmediatamente a urgencias ginecológicas o llame al 112.",
      B: "🟠 PRIORITARIO: Una ginecóloga se pondrá en contacto hoy mismo."
    },
    "salut-mental": {
      A: "🔴 CRISIS: Llame inmediatamente al teléfono de crisis (024) o al 112.",
      B: "🟠 PRIORITARIO: Un psicólogo/psiquiatra se pondrá en contacto hoy mismo."
    }
  };
  
  return specialtyMessages[specialty]?.[level] || baseMessages[level];
}

/**
 * Genera un resumen de las respuestas para mostrar al usuario
 */
export function generateAnswerSummary(answers, questions) {
  return answers.map(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return {
      question: question?.text || 'Pregunta no encontrada',
      response: answer.response,
      level: question?.level
    };
  }).filter(item => item.question !== 'Pregunta no encontrada');
}