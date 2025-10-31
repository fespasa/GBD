import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';

// Components
import Test from './components/Test';

// Pages
import Welcome from './pages/Welcome';
import WelcomeSimple from './pages/WelcomeSimple';
import Login from './pages/Login';
import LoginSimple from './pages/LoginSimple';
import Register from './pages/Register';
import RegisterSimple from './pages/RegisterSimple';
import SpecialtySelection from './pages/SpecialtySelection';
import SpecialtySelectionSimple from './pages/SpecialtySelectionSimple';
import Triage from './pages/Triage';
import TriageSimple from './pages/TriageSimple';
import Results from './pages/Results';
import ResultsSimple from './pages/ResultsSimple';
import ScheduleCall from './pages/ScheduleCall';
import VideoCall from './pages/VideoCall';
import VideoCallSimple from './pages/VideoCallSimple';
import ProfileComplete from './pages/ProfileComplete';
import Reports from './pages/Reports';
import History from './pages/History';
import Appointments from './pages/Appointments';
import AdvisorConsultation from './pages/AdvisorConsultation';
import AdvisorWait from './pages/AdvisorWait';
import ScheduleAdvisorCall from './pages/ScheduleAdvisorCall';
import AdvisorScheduled from './pages/AdvisorScheduled';
import PatientInfo from './pages/PatientInfo';
import Emergency from './pages/Emergency';
import MentalHealthForm from './pages/MentalHealthForm';
import ContactOptions from './pages/ContactOptions';
import WaitForCall from './pages/WaitForCall';

function App() {
  const { user } = useApp();

  return (
    <div className="App">
      <Routes>
        {/* Test route */}
        <Route path="/test" element={<Test />} />
        
        {/* Public routes */}
        <Route path="/" element={<WelcomeSimple />} />
        <Route path="/welcome-full" element={<Welcome />} />
        <Route path="/login" element={<LoginSimple />} />
        <Route path="/login-full" element={<Login />} />
        <Route path="/register" element={<RegisterSimple />} />
        <Route path="/register-full" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/specialty-selection" element={<SpecialtySelectionSimple />} />
        <Route path="/specialties" element={<SpecialtySelectionSimple />} />
        <Route path="/specialties-full" element={<SpecialtySelection />} />
        <Route path="/profile-complete" element={<ProfileComplete />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/history" element={<History />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/advisor-consultation" element={<AdvisorConsultation />} />
        <Route path="/advisor-wait" element={<AdvisorWait />} />
        <Route path="/schedule-advisor-call" element={<ScheduleAdvisorCall />} />
        <Route path="/advisor-scheduled" element={<AdvisorScheduled />} />
        <Route path="/patient-info" element={<PatientInfo />} />
        <Route path="/triage/:specialty" element={<TriageSimple />} />
        <Route path="/triage-full/:specialty" element={<Triage />} />
        <Route path="/results" element={<ResultsSimple />} />
        <Route path="/results-full" element={<Results />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/mental-health-form" element={<MentalHealthForm />} />
        <Route path="/contact-options" element={<ContactOptions />} />
        <Route path="/wait-for-call" element={<WaitForCall />} />
        <Route path="/schedule-call" element={<ScheduleCall />} />
        <Route path="/video-call" element={<VideoCallSimple />} />
        <Route path="/video-call-full" element={<VideoCall />} />
        
        {/* Fallback */}
        <Route path="*" element={<WelcomeSimple />} />
      </Routes>
    </div>
  );
}

export default App;
