import React from 'react';
import { useLOS } from "./loscontext";
export default function Step4KYCBureau() {
  const { application, setCurrentStep } = useLOS();

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-1">4. KYC & Credit Bureau Score</h2>
      <p className="text-xs text-gray-500 mb-6">Automated check fetched via TransUnion CIBIL adapter upon consent.</p>

      <div className="border border-blue-100 bg-blue-50/50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
            {application.bureauName} Verified
          </span>
          <h3 className="text-4xl font-extrabold text-gray-900 font-mono mt-3">
            {application.creditScore}
            <span className="text-xs font-medium text-gray-500 ml-2">/ 900</span>
          </h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">✓ Excellent Credit Profile (Low Risk)</p>
          <p className="text-[11px] text-gray-400 mt-2">Pulled on: {application.bureauPullDate}</p>
        </div>

        <div className="text-xs space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-xs w-full md:w-64">
          <div className="flex justify-between">
            <span className="text-gray-500">Overdue / DPD:</span>
            <span className="font-semibold text-emerald-600">0 Days (Clean)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Enquiries (Last 30d):</span>
            <span className="font-semibold text-gray-800">1 Enquiry</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Active Accounts:</span>
            <span className="font-semibold text-gray-800">2 Accounts</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={() => setCurrentStep(3)} className="text-gray-600 text-sm font-medium hover:underline">
          ← Back
        </button>
        <button
          onClick={() => setCurrentStep(5)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm"
        >
          Continue to Documents
        </button>
      </div>
    </div>
  );
}