import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  currentConsultation: null,
  triageAnswers: [],
  currentSpecialty: null,
  currentQuestionIndex: 0,
  patientInfo: null,
};

const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_CONSULTATION: 'SET_CONSULTATION',
  ADD_ANSWER: 'ADD_ANSWER',
  REMOVE_LAST_ANSWER: 'REMOVE_LAST_ANSWER',
  SET_SPECIALTY: 'SET_SPECIALTY',
  NEXT_QUESTION: 'NEXT_QUESTION',
  PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
  RESET_TRIAGE: 'RESET_TRIAGE',
  SET_QUESTION_INDEX: 'SET_QUESTION_INDEX',
  SET_PATIENT_INFO: 'SET_PATIENT_INFO',
};

function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        currentConsultation: null,
        triageAnswers: [],
        currentSpecialty: null,
        currentQuestionIndex: 0,
        patientInfo: null,
      };

    case actionTypes.SET_CONSULTATION:
      return {
        ...state,
        currentConsultation: action.payload,
      };

    case actionTypes.ADD_ANSWER:
      return {
        ...state,
        triageAnswers: [...state.triageAnswers, action.payload],
      };

    case actionTypes.REMOVE_LAST_ANSWER:
      return {
        ...state,
        triageAnswers: state.triageAnswers.slice(0, -1),
      };

    case actionTypes.SET_SPECIALTY:
      return {
        ...state,
        currentSpecialty: action.payload,
        triageAnswers: [],
        currentQuestionIndex: 0,
      };

    case actionTypes.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case actionTypes.PREVIOUS_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };

    case actionTypes.RESET_TRIAGE:
      return {
        ...state,
        triageAnswers: [],
        currentSpecialty: null,
        currentQuestionIndex: 0,
        currentConsultation: null,
      };

    case actionTypes.SET_QUESTION_INDEX:
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };

    case actionTypes.SET_PATIENT_INFO:
      return {
        ...state,
        patientInfo: action.payload,
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    login: (user) => dispatch({ type: actionTypes.LOGIN, payload: user }),
    logout: () => dispatch({ type: actionTypes.LOGOUT }),
    setConsultation: (consultation) => 
      dispatch({ type: actionTypes.SET_CONSULTATION, payload: consultation }),
    addAnswer: (answer) => dispatch({ type: actionTypes.ADD_ANSWER, payload: answer }),
    removeLastAnswer: () => dispatch({ type: actionTypes.REMOVE_LAST_ANSWER }),
    setSpecialty: (specialty) => 
      dispatch({ type: actionTypes.SET_SPECIALTY, payload: specialty }),
    nextQuestion: () => dispatch({ type: actionTypes.NEXT_QUESTION }),
    previousQuestion: () => dispatch({ type: actionTypes.PREVIOUS_QUESTION }),
    resetTriage: () => dispatch({ type: actionTypes.RESET_TRIAGE }),
    setQuestionIndex: (index) => 
      dispatch({ type: actionTypes.SET_QUESTION_INDEX, payload: index }),
    setPatientInfo: (patientInfo) => 
      dispatch({ type: actionTypes.SET_PATIENT_INFO, payload: patientInfo }),
  };

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;