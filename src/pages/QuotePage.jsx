// src/pages/QuotePage.jsx
import React from "react";
import QuoteForm from "../components/forms/QuoteForm.jsx";

export default function QuotePage() {
  const EMAIL = "quotes@tesinsurance.com";

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Start Your Free Quote
      </h1>

      <QuoteForm email={EMAIL} />
    </section>
  );
}
