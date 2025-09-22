import React from "react";
import QuoteForm from "../forms/QuoteForm.jsx";
import EmailContactForm from "../forms/EmailContactForm.jsx";
import { PhoneIcon, MailIcon, PinIcon, ShieldIcon } from "../icons/index.jsx";
import { digitsOnly } from "../../lib/phone.js";

export default function Contact({ email, phone, license }) {
  return (
    <section id="contact" className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Contact us</h2>
            <p className="mt-2 text-slate-300">Have questions about coverage or documents? We’re here to help.</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li className="flex items-center gap-3"><PhoneIcon /> <a className="hover:underline" href={`tel:${digitsOnly(phone)}`}>{phone}</a></li>
              <li className="flex items-center gap-3"><MailIcon /> <a className="hover:underline" href={`mailto:${email}`}>{email}</a></li>
              <li className="flex items-center gap-3"><ShieldIcon /> {license}</li>
            </ul>
          </div>
          
          <div>
            <EmailContactForm email={email} dark={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
