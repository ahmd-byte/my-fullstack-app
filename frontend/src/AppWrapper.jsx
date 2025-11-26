import React from 'react';

export default function AppWrapper({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
      {children}
    </div>
  );
}
