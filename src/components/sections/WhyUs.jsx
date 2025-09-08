import React from "react";
import QuoteForm from "../forms/QuoteForm.jsx";
import { CheckIcon } from "../icons/index.jsx";

export default function WhyUs() {
  const points = [
    { title: "Independent & unbiased", desc: "We shop multiple carriers—so you don’t have to." },
    { title: "Fast & friendly service", desc: "Text, call, or email. We respond quickly with clear answers." },
    { title: "Local expertise", desc: "Philadelphia & Pennsylvania coverage, filings, and discounts." },
  ];
  return (
    <section id="why-us" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why choose us</h2>
            <p className="mt-2 text-slate-600">Real people, real savings, real coverage. We’ll explain options in plain English—or Tigrinya if preferred.</p>
            <ul className="mt-6 space-y-4">
              {points.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium text-slate-900">{p.title}</p>
                    <p className="text-sm text-slate-600">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
