import React from "react";
import { digitsOnly } from "../../lib/phone.js";
import { ShieldIcon, SparklesIcon, ClockIcon } from "../icons/index.jsx";

export default function Hero({ agencyName, phone }) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-700">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-white">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Licensed in Pennsylvania
          </p>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight">
            Smart insurance for Auto, Home & Small Business.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-blue-100">
            {agencyName} compares top carriers to find the right coverage at the right price—so you can focus on what matters.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#quote" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-blue-700 shadow hover:bg-blue-50">
              Get my free quote
            </a>
            <a href={`tel:${digitsOnly(phone)}`} className="inline-flex items-center justify-center rounded-xl border border-white/40 px-5 py-3 font-medium text-white hover:bg-white/10">
              Call us: {phone}
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-blue-100 text-sm">
            <li className="flex items-center gap-2"><ShieldIcon /> Personalized advice</li>
            <li className="flex items-center gap-2"><SparklesIcon /> Multiple carrier quotes</li>
            <li className="flex items-center gap-2"><ClockIcon /> Fast service</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
