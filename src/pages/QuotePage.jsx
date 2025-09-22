// src/pages/QuotePage.jsx
import React from "react";
import QuoteForm from "../components/forms/QuoteForm.jsx";
import EmailContactForm from "../components/forms/EmailContactForm.jsx";

export default function QuotePage() {
  const EMAIL = "info@tesinsurance.com";

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Get Your Free Insurance Quote
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Complete the form below with your information and we'll provide you with competitive quotes from top insurance carriers. 
          Our licensed agents will review your details and contact you within 24 hours.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">What You'll Need</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Personal Information</h3>
              <ul className="space-y-1">
                <li>• Full name and contact details</li>
                <li>• Date of birth and occupation</li>
                <li>• Complete address information</li>
                <li>• Driver's license number (for auto)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Insurance Details</h3>
              <ul className="space-y-1">
                <li>• Vehicle information (for auto insurance)</li>
                <li>• Property details (for home insurance)</li>
                <li>• Business information (for commercial)</li>
                <li>• Coverage preferences</li>
              </ul>
            </div>
          </div>
        </div>

        <QuoteForm email={EMAIL} />
      </div>

      {/* Email Contact Form */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-slate-600">
            Send us a message and we'll get back to you within 24 hours.
          </p>
        </div>
        <EmailContactForm email={EMAIL} />
      </div>

      <div className="mt-12 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Why Choose Tes Insurance Agency?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Licensed and dedicated insurance professionals</li>
            <li>• Access to 50+ top-rated insurance carriers</li>
            <li>• Personalized service and competitive rates</li>
            <li>• 24/7 claims support and customer service</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
