import React, { useState } from "react";
import { useLOS } from "./loscontext";
import { calculateEMI, calculateRatios, formatINR } from "./loscal";
export default function UnderwriterWorkbench({ onBack }) {
  const { application } = useLOS();
  const [decision, setDecision] = useState('');
  const [remarks, setRemarks] = useState('');

  const newEmi = calculateEMI(
    application.requestedAmount,
    application.systemDerivedRate,
    application.tenureMonths
  );
  const { foir, dti, isFoirEligible } = calculateRatios(
    application.grossMonthlyIncome,
    application.netMonthlyIncome,
    application.existingEMIs,
    newEmi
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
        <div>
          <button onClick={onBack} className="text-xs text-blue-600 font-semibold mb-1">
            ← Back to Application Queue
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            Underwriter Workbench: {application.appNumber}
          </h2>
          <p className="text-xs text-gray-500">Applicant: {application.fullName} | {application.loanType}</p>
        </div>
        <div className="text-right">
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
            Under Review (SLA: 4h left)
          </span>
        </div>
      </div>

      {/* Ratios & Credit Metric Grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-500">Calculated FOIR</p>
          <p className={`text-2xl font-bold font-mono ${isFoirEligible ? 'text-emerald-600' : 'text-red-600'}`}>
            {foir}%
          </p>
          <p className="text-[11px] text-gray-500 mt-1">Threshold: Max 50.0%</p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-500">Debt To Income (DTI)</p>
          <p className="text-2xl font-bold font-mono text-gray-800">{dti}%</p>
          <p className="text-[11px] text-gray-500 mt-1">Gross: {formatINR(application.grossMonthlyIncome)}</p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-500">Bureau Score & Rate</p>
          <p className="text-2xl font-bold font-mono text-blue-600">
            {application.creditScore}{' '}
            <span className="text-sm text-gray-500">({application.systemDerivedRate}%)</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Auto-Pricing Validated</p>
        </div>
      </div>

      {/* Decision Panel */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Maker-Checker Sanction Decision</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Decision Action</label>
            <select
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
            >
              <option value="">Select Action...</option>
              <option value="APPROVE">Approve & Issue Sanction Letter</option>
              <option value="REFER">Refer to Credit Committee</option>
              <option value="REJECT">Reject (Adverse Credit)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Reason Code / Notes</label>
            <input
              type="text"
              placeholder="e.g. Within FOIR limit, CIBIL clean"
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            disabled={!decision}
            onClick={() => alert(`Application ${application.appNumber} marked as ${decision}`)}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm"
          >
            Submit Decision
          </button>
        </div>
      </div>
    </div>
  );
}