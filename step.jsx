import React from 'react';
import { useLOS } from "./loscontext";

const steps = [
  'Applicant Details',
  'Income & Profile',
  'Loan Terms',
  'KYC & Bureau',
  'Documents',
  'Review & Submit',
];

export default function Stepper() {
  const { currentStep } = useLOS();

  return (
    <div className="w-full bg-white border-b border-gray-200 py-4 px-4 mb-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {steps.map((title, idx) => {
          const stepNum = idx + 1;
          const isDone = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <div key={title} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <span
                className={`text-[11px] mt-1.5 font-medium text-center hidden sm:block ${
                  isCurrent ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}