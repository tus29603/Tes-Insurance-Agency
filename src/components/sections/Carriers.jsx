import React from "react";
import CARRIERS from "../../data/carriers.js";

export default function Carriers() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-slate-500">We compare quotes from top-rated carriers</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CARRIERS.map((c) => (
            <div key={c} className="flex h-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-600">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
