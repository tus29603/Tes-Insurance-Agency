import React from "react";
import { ChevronIcon } from "../icons/index.jsx";

export default function FAQ() {
  const qas = [
    { q: "How fast can I get proof of insurance?", a: "Often same day. Many personal policies can be bound immediately after payment; commercial may require underwriting review." },
    { q: "Do you charge broker fees?", a: "No agency fees on most personal policies. For certain commercial risks, a disclosed fee may apply—ask us first." },
    { q: "What discounts are available?", a: "Bundles, telematics, homeowner, claim-free, and more. We’ll check all eligible discounts with each carrier." },
  ];
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently asked questions</h2>
      <div className="mt-8 grid gap-4">
        {qas.map((i) => (
          <details key={i.q} className="group rounded-2xl border border-slate-200 bg-white p-5">
            <summary className="flex cursor-pointer items-center justify-between">
              <span className="font-medium text-slate-900">{i.q}</span>
              <span className="ml-4 text-slate-400 group-open:rotate-180 transition"><ChevronIcon /></span>
            </summary>
            <p className="mt-3 text-slate-600">{i.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
