import React, { useState } from "react";
import { ChevronIcon } from "../icons/index.jsx";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  
  const qas = [
    { 
      q: "How fast can I get proof of insurance?", 
      a: "Often same day. Many personal policies can be bound immediately after payment; commercial may require underwriting review." 
    },
    { 
      q: "Do you charge broker fees?", 
      a: "No agency fees on most personal policies. For certain commercial risks, a disclosed fee may apply—ask us first." 
    },
    { 
      q: "What discounts are available?", 
      a: "Bundles, telematics, homeowner, claim-free, and more. We'll check all eligible discounts with each carrier." 
    },
    { 
      q: "What types of insurance do you offer?", 
      a: "We provide auto, home, renters, landlord, umbrella, commercial auto, general liability, workers' compensation, and more. Contact us for a complete list." 
    },
    { 
      q: "How do you compare to other agencies?", 
      a: "As an independent agency, we work with 50+ top-rated carriers to find you the best coverage at competitive rates. We're not tied to any single company." 
    },
    { 
      q: "What if I need to file a claim?", 
      a: "We provide 24/7 claims support and will guide you through the process. Our experienced team ensures your claim is handled quickly and fairly." 
    },
  ];
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently asked questions</h2>
      <div className="mt-8 grid gap-4">
        {qas.map((item, index) => (
          <div 
            key={item.q} 
            className={`rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 ${
              openIndex === index ? 'shadow-lg border-blue-300' : 'hover:shadow-md'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <span className="font-medium text-slate-900 pr-4">{item.q}</span>
              <span className={`ml-4 text-slate-400 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}>
                <ChevronIcon />
              </span>
            </button>
            {openIndex === index && (
              <div className="mt-3 text-slate-600 animate-fadeIn">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
