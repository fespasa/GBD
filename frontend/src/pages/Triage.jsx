import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { triageService } from '../services/apiService';
import QuestionScreen from '../components/QuestionScreen';

function Triage() {
  const { specialty } = useParams();
  const navigate = useNavigate();
  const { 
    user, 
    currentSpecialty, 
    triageAnswers, 
    currentQuestionIndex,
    addAnswer,
    removeLastAnswer,
    nextQuestion,
    previousQuestion,
    setQuestionIndex
  } = useApp();

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (!currentSpecialty || currentSpecialty.id !== specialty) {
      navigate('/specialties');
      return;
    }

    loadQuestions();
  }, [user, currentSpecialty, specialty, navigate]);

  useEffect(() => {
    // Restore answer for current question
    const currentQuestionId = questions[currentQuestionIndex]?.id;
    const existingAnswer = triageAnswers.find(answer => answer.questionId === currentQuestionId);
    setCurrentAnswer(existingAnswer?.response || '');
  }, [currentQuestionIndex, questions, triageAnswers]);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await triageService.getQuestions(specialty);
      
      if (response.success) {
        setQuestions(response.questions);
      } else {
        setError('No se pudieron cargar las preguntas');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setError('Error de conexión al cargar las preguntas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (answer) => {
    setCurrentAnswer(answer);
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if we already have an answer for this question
    const existingAnswerIndex = triageAnswers.findIndex(
      answer => answer.questionId === currentQuestion.id
    );

    const newAnswer = {
      questionId: currentQuestion.id,
      response: currentAnswer,
      questionText: currentQuestion.text
    };

    if (existingAnswerIndex !== -1) {
      // Replace existing answer
      triageAnswers[existingAnswerIndex] = newAnswer;
    } else {
      // Add new answer
      addAnswer(newAnswer);
    }

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      // All questions answered, submit triage
      submitTriage();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      previousQuestion();
    }
  };

  const submitTriage = async () => {
    try {
      setIsLoading(true);
      
      // Include the last answer
      const currentQuestion = questions[currentQuestionIndex];
      const finalAnswers = [...triageAnswers];
      
      const existingAnswerIndex = finalAnswers.findIndex(
        answer => answer.questionId === currentQuestion.id
      );
      
      const lastAnswer = {
        questionId: currentQuestion.id,
        response: currentAnswer,
        questionText: currentQuestion.text
      };

      if (existingAnswerIndex !== -1) {
        finalAnswers[existingAnswerIndex] = lastAnswer;
      } else {
        finalAnswers.push(lastAnswer);
      }

      const triageData = {
        specialty: specialty,
        answers: finalAnswers,
        userId: user.id
      };

      const response = await triageService.submitTriage(triageData);
      
      if (response.success) {
        // Navigate to results with consultation data
        navigate('/results', { 
          state: { 
            consultation: response.consultation,
            answers: finalAnswers,
            questions: questions
          } 
        });
      } else {
        setError('Error al procesar el triaje');
      }
    } catch (error) {
      console.error('Error submitting triage:', error);
      setError('Error de conexión al enviar las respuestas');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregant preguntes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/specialties')}
            className="btn-primary"
          >
            Tornar a especialitats
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No hi ha preguntes disponibles
          </h2>
          <p className="text-gray-600 mb-6">
            No s'han trobat preguntes per aquesta especialitat.
          </p>
          <button
            onClick={() => navigate('/specialties')}
            className="btn-primary"
          >
            Tornar a especialitats
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {/* Header with specialty info */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Triatge - {currentSpecialty?.name}
              </h1>
              <p className="text-gray-600 text-sm">
                {currentSpecialty?.description}
              </p>
            </div>
            <button
              onClick={() => navigate('/specialties')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Canviar especialitat
            </button>
          </div>
        </div>
      </div>

      {/* Question Screen */}
      <QuestionScreen
        question={currentQuestion}
        currentAnswer={currentAnswer}
        onAnswerChange={handleAnswerChange}
        onNext={handleNext}
        onBack={handleBack}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
    </div>
  );
}

export default Triage;