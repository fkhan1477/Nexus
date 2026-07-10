import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboard Pages
import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';

// Profile Pages
import { EntrepreneurProfile } from './pages/profile/EntrepreneurProfile';
import { InvestorProfile } from './pages/profile/InvestorProfile';

// Integrated Collaboration Module Framework Suite (Week 1 & Week 2 Suite)
import CollaborationSuite from './components/calender/CollaborationSuite';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Master Dashboard Frame Workspace Structure Container */}
          <Route path="/" element={<DashboardLayout />}>
            {/* Index redirection transfers user directly to their respective role dashboard */}
            <Route index element={<Navigate to="/login" replace />} />
            
            {/* Roles Dashboards */}
            <Route path="entrepreneur" element={<EntrepreneurDashboard />} />
            <Route path="investor" element={<InvestorDashboard />} />
            
            {/* User Profile Panels */}
            <Route path="entrepreneur/profile" element={<EntrepreneurProfile />} />
            <Route path="investor/profile" element={<InvestorProfile />} />

            {/* Embedded Collaboration Suite Content Window Link */}
            <Route path="collaboration" element={<CollaborationSuite />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;