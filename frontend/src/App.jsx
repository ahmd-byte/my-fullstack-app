import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AutomationList from './pages/AutomationList';
import AutomationDetail from './pages/AutomationDetail';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// Placeholder for Logs page
const Logs = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">System Logs</h1>
    <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-soft">
      <p className="text-text-secondary-light dark:text-text-secondary-dark">Log viewer implementation coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="automations" element={<AutomationList />} />
          <Route path="automations/:id" element={<AutomationDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="logs" element={<Logs />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
