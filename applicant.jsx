import React from 'react';
import { useLOS } from "./loscontext";
export default function Step1Applicant() {
  const { application, updateApplication, setCurrentStep } = useLOS();

  const handleIfscChange = (e) => {
    const code = e.target.value.toUpperCase();
    updateApplication({ ifscCode: code });
    if (code.length === 11) {
      // Mock IFSC lookup
      updateApplication({
        bankName: 'HDFC Bank Ltd',
        branch: 'Babatpur Branch',
        bankVerified: true
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-1">1. Applicant & Bank Details</h2>
      <p className="text-xs text-gray-500 mb-6">Enter your personal and disbursement account information.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Full Name (As per PAN)</label>
          <input
            type="text"
            className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            value={application.fullName}
            onChange={(e) => updateApplication({ fullName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            value={application.dob}
            onChange={(e) => updateApplication({ dob: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">PAN Number</label>
          <input
            type="text"
            maxLength={10}
            className="w-full text-sm uppercase border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
            value={application.panNumber}
            onChange={(e) => updateApplication({ panNumber: e.target.value.toUpperCase() })}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Mobile (Linked to Aadhaar)</label>
          <input
            type="tel"
            maxLength={10}
            className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            value={application.mobileNumber}
            onChange={(e) => updateApplication({ mobileNumber: e.target.value })}
          />
        </div>
      </div>

      {/* Bank Account Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Disbursal Bank Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Account Number</label>
            <input
              type="password"
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-mono"
              value={application.accountNumber}
              onChange={(e) => updateApplication({ accountNumber: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">IFSC Code</label>
            <input
              type="text"
              maxLength={11}
              className="w-full text-sm uppercase font-mono border border-gray-300 rounded-lg p-2.5"
              value={application.ifscCode}
              onChange={handleIfscChange}
            />
          </div>
        </div>
        {application.bankVerified && (
          <div className="mt-3 bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg border border-emerald-200 flex items-center justify-between">
            <span>✓ Verified: <b>{application.bankName}</b> ({application.branch})</span>
            <span className="font-semibold text-[11px] uppercase">Penny Drop Success</span>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setCurrentStep(2)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}