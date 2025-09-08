import React, { useMemo, useState } from "react";

export default function QuoteForm({ dark = false, email = "quotes@example.com" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    type: "Auto",
    details: "",
  });

  const isValid = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      /@/.test(form.email) &&
      /\d{7}/.test(form.phone.replace(/\D/g, "")) &&
      /^\d{5}$/.test(form.zip)
    );
  }, [form]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Quote request – ${form.type} – ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nZIP: ${form.zip}\nType: ${form.type}\nDetails: ${form.details}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Quote form">
      <div className={`text-lg font-semibold ${dark ? "text-white" : "text-slate-900"}`}>Start your free quote</div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-500">Full name</label>
          <input required name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm text-slate-500">Email</label>
          <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm text-slate-500">Phone</label>
          <input required name="phone" value={form.phone} onChange={handleChange} placeholder="(215) 555-0199" className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm text-slate-500">ZIP</label>
          <input required pattern="\d{5}" name="zip" value={form.zip} onChange={handleChange} placeholder="19142" className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-500">Coverage type</label>
          <select name="type" value={form.type} onChange={handleChange} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
            <option>Auto</option>
            <option>Homeowners</option>
            <option>Renters</option>
            <option>Landlord / DP</option>
            <option>Commercial Auto / Trucking</option>
            <option>General Liability</option>
            <option>Workers' Comp</option>
            <option>Umbrella</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-500">Notes / vehicle or property details</label>
          <textarea name="details" value={form.details} onChange={handleChange} placeholder="e.g., 2021 Toyota Camry, prior incidents, current carrier; or property address and year built" className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" rows={4} />
        </div>
      </div>
      <button disabled={!isValid} className={`w-full rounded-xl px-5 py-3 font-medium shadow ${isValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`}>
        Send quote request
      </button>
      <p className="text-xs text-slate-400">By submitting, you agree to be contacted by phone, text, or email about your quote. No spam—ever.</p>
    </form>
  );
}
