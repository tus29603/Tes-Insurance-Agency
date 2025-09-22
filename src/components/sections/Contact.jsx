import React from "react";
import QuoteForm from "../forms/QuoteForm.jsx";
import EmailContactForm from "../forms/EmailContactForm.jsx";
import { PhoneIcon, MailIcon, PinIcon, ShieldIcon } from "../icons/index.jsx";
import { digitsOnly } from "../../lib/phone.js";
import { trackPhoneClick, trackEmailClick, trackCTAClick } from "../../lib/analytics.js";

export default function Contact({ email, phone, license }) {
  return (
    <section id="contact" className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Contact us</h2>
            <p className="mt-2 text-slate-300">Have questions about coverage or documents? We’re here to help.</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li className="flex items-center gap-3">
                <PhoneIcon /> 
                <a 
                  className="hover:underline hover:text-white transition-colors" 
                  href={`tel:${digitsOnly(phone)}`}
                  onClick={() => trackPhoneClick(phone, 'Contact Section')}
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon /> 
                <a 
                  className="hover:underline hover:text-white transition-colors" 
                  href={`mailto:${email}`}
                  onClick={() => trackEmailClick(email, 'Contact Section')}
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ShieldIcon /> 
                <span className="text-slate-300">{license}</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <a 
                href="#quote"
                onClick={() => trackCTAClick('Get Quote', 'Contact Section')}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Get Your Free Quote
              </a>
            </div>
          </div>
          
          <div>
            <EmailContactForm email={email} dark={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
