import React from 'react';
import AutomationCard from '../components/AutomationCard';
import { useAuth } from '../context/AuthContext';

const automations = [
  { id: 1, name: 'System Health Check', description: 'Checks overall system status & performance.' },
  { id: 2, name: 'Log File Analysis', description: 'Scans logs for issues & warnings.' },
  { id: 3, name: 'Database Backup', description: 'Runs a full database backup.' },
  { id: 4, name: 'User Activity Report', description: 'Generates recent user activity insights.' },
];

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-3">
        Hello, {user?.username || 'Guest'} 👋
      </h1>
      <p className="text-center text-gray-300 mb-10">Run your automation tools below</p>

      <div className="grid gap-0 md:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center p-6">

        {automations.map((a) => (
          <AutomationCard key={a.id} {...a} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
