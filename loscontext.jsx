import React, { createContext, useContext, useState } from 'react';

const LOSContext = createContext();

export function LOSProvider({ children }) {
  const [activePortal, setActivePortal] = useState('user'); // 'user' | 'admin'
  const [currentStep, setCurrentStep] = useState(1);

  // Applicant Application State
  const [application, setApplication] = useState({
    appNumber: 'APP-2026-8941',
    status: 'Draft',
    channel: 'Self-Service Digital',
    // Step 1: Personal & Bank
    fullName: 'Amit Sharma',
    dob: '1996-08-15',
    panNumber: 'ABCDE1234F',
    mobileNumber: '9876543210',
    email: 'amit.sharma@example.com',
    currentAddress: 'B-402, Green Park Avenue',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pinCode: '221006',
    accountNumber: '918273645012',
    ifscCode: 'HDFC0000123',
    bankName: 'HDFC Bank Ltd',
    branch: 'Babatpur Branch',
    bankVerified: true,
    userType: 'Salaried',
    employerName: 'Tata Consultancy Services',
    grossMonthlyIncome: 85000,
    netMonthlyIncome: 70000,
    existingEMIs: 8000,

    loanType: 'Personal Loan',
    requestedAmount: 500000,
    tenureMonths: 36,
    systemDerivedRate: 10.5, // System controls rate (Read-only for applicant)
    purpose: 'Medical Emergency',

    creditScore: 765,
    bureauName: 'TransUnion CIBIL',
    bureauPullDate: '14 Oct 2026, 11:30 AM',
    kycConsent: true,
    bureauConsent: true,

    documents: [
      { id: 'pan', name: 'PAN Card', status: 'Uploaded', file: 'pan_card.pdf', mandatory: true },
      { id: 'aadhaar', name: 'Aadhaar Card', status: 'Uploaded', file: 'aadhaar_front_back.pdf', mandatory: true },
      { id: 'salary_slip', name: 'Salary Slips (Last 3 Months)', status: 'Uploaded', file: 'salary_slips_q3.pdf', mandatory: true },
      { id: 'bank_statement', name: 'Bank Statement (6 Months)', status: 'Uploaded', file: 'bank_stmt.pdf', mandatory: true }
    ],
    
    auditLog: [
      { action: 'Draft Created', by: 'Applicant', time: '14 Oct 2026, 11:00 AM' }
    ]
  });

  const [applicationsList, setApplicationsList] = useState([
    {
      appNumber: 'APP-2026-8941',
      applicantName: 'Amit Sharma',
      loanType: 'Personal Loan',
      requestedAmount: 500000,
      creditScore: 765,
      status: 'Submitted',
      stage: 'Underwriting',
      lastUpdated: '14 Oct 2026',
      assignedTo: 'Credit Underwriter'
    },
    {
      appNumber: 'APP-2026-7721',
      applicantName: 'Priya Verma',
      loanType: 'Home Loan',
      requestedAmount: 2500000,
      creditScore: 790,
      status: 'Under Review',
      stage: 'Document Verification',
      lastUpdated: '13 Oct 2026',
      assignedTo: 'Application Processor'
    }
  ]);

  const updateApplication = (fields) => {
    setApplication((prev) => ({ ...prev, ...fields }));
  };

  return (
    <LOSContext.Provider
      value={{
        activePortal,
        setActivePortal,
        currentStep,
        setCurrentStep,
        application,
        updateApplication,
        applicationsList,
        setApplicationsList
      }}
    >
      {children}
    </LOSContext.Provider>
  );
}

export const useLOS = () => useContext(LOSContext);