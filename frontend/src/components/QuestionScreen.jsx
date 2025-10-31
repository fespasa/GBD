import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function QuestionScreen({ 
  question, 
  currentAnswer, 
  onAnswerChange, 
  onNext, 
  onBack, 
  isFirstQuestion, 
  isLastQuestion,
  questionNumber,
  totalQuestions 
}) {
  const isAnswered = currentAnswer !== null && currentAnswer !== '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Pregunta {questionNumber} de {totalQuestions}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((questionNumber / totalQuestions) * 100)}% completat
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {question.text}
            </h2>

            {/* Answer options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`
                    block w-full p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                    ${currentAnswer === option
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="question-answer"
                    value={option}
                    checked={currentAnswer === option}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`
                      w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                      ${currentAnswer === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                      }
                    `}>
                      {currentAnswer === option && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              disabled={isFirstQuestion}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Enrere
            </button>

            <button
              onClick={onNext}
              disabled={!isAnswered}
              className="flex items-center gap-2 btn-primary disabled:opacity-50"
            >
              {isLastQuestion ? 'Finalitzar' : 'Següent'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Help text */}
          {!isAnswered && (
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                Seleccioni una resposta per continuar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;