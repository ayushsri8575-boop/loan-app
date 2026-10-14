import React from 'react';
import { useLOS } from "./loscontext";
export default function Navbar() {
  const { activePortal, setActivePortal, application } = useLOS();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
            F
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">FinEdge Bank</h1>
            <p className="text-xs text-gray-500 font-medium">Loan Origination System (LOS)</p>
          </div>
        </div>

        {/* Portal Switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActivePortal('user')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activePortal === 'user' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Applicant Portal
          </button>
          <button
            onClick={() => setActivePortal('admin')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activePortal === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Staff Workbench
          </button>
        </div>
      </div>
    </header>
  );
}