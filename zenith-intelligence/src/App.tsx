import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './pages/DashboardLayout';
import { DashboardOverview } from './pages/DashboardOverview';
import { DashboardCalculators } from './pages/DashboardCalculators';
import { DashboardPortfolios } from './pages/DashboardPortfolios';
import { DashboardMarket } from './pages/DashboardMarket';
import { DashboardUPI } from './pages/DashboardUPI';
import { DashboardSettings } from './pages/DashboardSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="calculators" element={<DashboardCalculators />} />
          <Route path="portfolios" element={<DashboardPortfolios />} />
          <Route path="market" element={<DashboardMarket />} />
          <Route path="upi" element={<DashboardUPI />} />
          <Route path="settings" element={<DashboardSettings />} />
          {/* Fallback for un-implemented dashboard sub-routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        {/* Fallback for root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;




