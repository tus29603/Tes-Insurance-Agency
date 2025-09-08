import React from "react";

export default function Testimonials() {
  const items = [
    { name: "Maria G.", text: "Made switching easy and saved me $42/month on auto + renters.", tag: "Auto + Renters" },
    { name: "Dawit H.", text: "Explained everything clearly. Got my COI the same day.", tag: "General Liability" },
    { name: "Sean P.", text: "Great price on trucking—helped with filings and certificates.", tag: "Commercial Auto" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What clients say</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <blockquote className="text-slate-700">“{t.text}”</blockquote>
            <figcaption className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span className="font-medium text-slate-900">{t.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1">{t.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
