import { useLOS } from "./loscontext";
import { calculateEMI, calculateLoanCharges, formatINR } from "./loscal";
export default function Step3LoanTerms() {
  const { application, updateApplication, setCurrentStep } = useLOS();

  const emi = calculateEMI(
    application.requestedAmount,
    application.systemDerivedRate,
    application.tenureMonths
  );
  const charges = calculateLoanCharges(application.requestedAmount, 2);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-1">3. Loan Configuration</h2>
      <p className="text-xs text-gray-500 mb-6">Select loan amount & tenure. System calculates derived rate & EMI.</p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-gray-700">Requested Amount</label>
            <span className="text-lg font-bold text-blue-600 font-mono">
              {formatINR(application.requestedAmount)}
            </span>
          </div>
          <input
            type="range"
            min="50000"
            max="2500000"
            step="25000"
            value={application.requestedAmount}
            onChange={(e) => updateApplication({ requestedAmount: Number(e.target.value) })}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            <span>₹50,000</span>
            <span>₹25,00,000</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Tenure: {application.tenureMonths} Months ({application.tenureMonths / 12} Years)
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[12, 24, 36, 48, 60].map((t) => (
              <button
                key={t}
                onClick={() => updateApplication({ tenureMonths: t })}
                className={`py-2 text-xs font-semibold rounded-lg border ${
                  application.tenureMonths === t
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {t} Mo
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-amber-900">System-Derived Interest Rate</p>
            <p className="text-[11px] text-amber-700">Calculated strictly via Risk Tier & CIBIL score (Read-only)</p>
          </div>
          <span className="text-xl font-extrabold text-amber-900 font-mono">
            {application.systemDerivedRate}% p.a.
          </span>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-[11px] text-gray-500">Monthly EMI</p>
              <p className="text-base font-bold text-gray-900 font-mono">{formatINR(emi)}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">Processing Fee (2%)</p>
              <p className="text-base font-bold text-gray-900 font-mono">{formatINR(charges.processingFee)}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">GST on Fee (18%)</p>
              <p className="text-base font-bold text-gray-900 font-mono">{formatINR(charges.gstOnFee)}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500">Net Disbursal</p>
              <p className="text-base font-bold text-emerald-600 font-mono">{formatINR(charges.netDisbursal)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentStep(2)}
          className="text-gray-600 text-sm font-medium hover:underline"
        >
          ← Back
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm"
        >
          Save & Proceed to KYC
        </button>
      </div>
    </div>
  );
}