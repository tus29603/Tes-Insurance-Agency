import React from "react";
import QuoteForm from "../components/forms/QuoteForm.jsx";
import Header from "../components/layout/Header.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";

export default function QuotePage() {
  const AGENCY_NAME = "Tes Insurance Agency";
  const PHONE = "(215) 555-0199";
  const EMAIL = "quotes@tesinsurance.com";
  const ADDRESS = "6622 Cormorant Pl, Philadelphia, PA 19142";
  const LICENSE = "PA Lic #TBD";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Header agencyName={AGENCY_NAME} phone={PHONE} />
      <main className="flex-grow mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Start Your Free Quote</h1>
        <QuoteForm email={EMAIL} />
      </main>
      <SiteFooter agencyName={AGENCY_NAME} license={LICENSE} email={EMAIL} />
    </div>
  );
}
