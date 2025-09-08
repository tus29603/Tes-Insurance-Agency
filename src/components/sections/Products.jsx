import React from "react";
import { CarIcon, HomeIcon, KeyIcon, BuildingIcon, TruckIcon, ShieldIcon, UsersIcon, UmbrellaIcon } from "../icons/index.jsx";

export default function Products() {
  const items = [
    { title: "Auto Insurance", desc: "Liability, Comp/Collision, SR-22 help.", icon: <CarIcon /> },
    { title: "Homeowners (HO-3)", desc: "Dwelling, personal property, liability.", icon: <HomeIcon /> },
    { title: "Renters (HO-4)", desc: "Protect your stuff and personal liability.", icon: <KeyIcon /> },
    { title: "Landlord (DP-3)", desc: "Coverage for rental properties and loss of rents.", icon: <BuildingIcon /> },
    { title: "Commercial Auto & Trucking", desc: "Local/long-haul, cargo, bobtail, filings.", icon: <TruckIcon /> },
    { title: "General Liability (CGL)", desc: "For shops, contractors, and offices.", icon: <ShieldIcon /> },
    { title: "Workers’ Comp", desc: "Protect employees and meet PA requirements.", icon: <UsersIcon /> },
    { title: "Umbrella", desc: "Extra protection above your primary limits.", icon: <UmbrellaIcon /> },
  ];

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Coverage we offer</h2>
        <p className="mt-2 text-slate-600">Bundle and save. Ask about auto + home discounts and multi-policy credits.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="mb-3 text-blue-700">{item.icon}</div>
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center">
        <a href="/quote" className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-white font-medium shadow hover:bg-blue-700">Start my quote</a>
      </div>
    </section>
  );
}
