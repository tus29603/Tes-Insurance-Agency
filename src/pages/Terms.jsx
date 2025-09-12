import React from "react";

export default function Terms() {
  return (
    <div className="prose max-w-none px-4 py-8">
      <h1>Terms of Use</h1>
      <p>
        These Terms govern your use of our website and quote forms. This is placeholder copy. Replace with
        your attorney-approved terms before launch.
      </p>
      <h2>Submission Authorization</h2>
      <p>
        By submitting a request, you represent the information is accurate and that you have authority to request
        insurance quotes for yourself or your business.
      </p>
      <h2>Contact & Communications</h2>
      <p>
        If you opt in, we may contact you by phone, email, or text regarding your request. Consent is not a
        condition of purchase.
      </p>
      <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
