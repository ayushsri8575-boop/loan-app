import React from 'react';
import { LOSProvider, useLOS } from './loscontext';
import Navbar from './nav';
import Stepper from './step';
import Step1Applicant from './applicant';
import Step3LoanTerms from './loanterm';
import Step4KYCBureau from './kyc';
import AdminDashboard from './admin';

function MainRouter() {
  const { activePortal, currentStep } = useLOS();

  if (activePortal === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Stepper />
      <main className="px-4">
        {currentStep === 1 && <Step1Applicant />}
        {currentStep === 2 && <Step3LoanTerms />}
        {currentStep === 3 && <Step3LoanTerms />}
        {currentStep === 4 && <Step4KYCBureau />}
        {currentStep >= 5 && <Step4KYCBureau />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LOSProvider>
      <Navbar />
      <MainRouter />
    </LOSProvider>
  );
}