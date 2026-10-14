import React, { useState } from "react";
import { useLOS } from "./loscontext";
import UnderwriterWorkbench from "./underwrite";
import { formatINR } from "./loscal";

export default function AdminDashboard() {
  const { applicationsList } = useLOS();
  const [selectedApp, setSelectedApp] = useState(null);

  if (selectedApp) {
    return <UnderwriterWorkbench onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Credit Operations Pipeline</h2>
          <p className="text-xs text-gray-500">Live applications queue & maker-checker queue</p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Application Number</th>
              <th className="p-4">Applicant</th>
              <th className="p-4">Loan Type</th>
              <th className="p-4">Amount</th>
              <th className="p-4">CIBIL</th>
              <th className="p-4">Current Stage</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applicationsList.map((app) => (
              <tr key={app.appNumber} className="hover:bg-gray-50/80">
                <td className="p-4 font-mono font-bold text-blue-600">{app.appNumber}</td>
                <td className="p-4 font-medium text-gray-900">{app.applicantName}</td>
                <td className="p-4 text-gray-600">{app.loanType}</td>
                <td className="p-4 font-mono font-bold text-gray-900">{formatINR(app.requestedAmount)}</td>
                <td className="p-4">
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {app.creditScore}
                  </span>
                </td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded">
                    {app.stage}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700"
                  >
                    Open Case
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}