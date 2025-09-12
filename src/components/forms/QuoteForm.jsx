import React, { useEffect, useMemo, useState } from "react";
 import ConsentFields from "../ConsentFields.jsx";

// For GitHub Pages, simplest is to hardcode your Formspree ID.
// Later you can switch to env: import.meta.env.VITE_FORMSPREE_ID
const FORMSPREE_ID = "xzzaowkq";
const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;

// Years for vehicles (current → 1981)
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1980 }, (_, i) => String(CURRENT_YEAR - i));

export default function QuoteForm({ dark = false, email = "tesfie056@gmail.com" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    type: "Auto",
    details: "",
    // Auto
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    // Property (Homeowners/Renters/Landlord/Umbrella)
    propertyAddress: "",
    yearBuilt: "",
    // Commercial Auto / Trucking
    businessName: "",
    dotNumber: "",
    // Workers' Comp
    numEmployees: "",
    annualPayroll: "",
    // General Liability
    operations: "",
    // Honeypot (hidden)
    company: "",
  });

  const [vehicles, setVehicles] = useState(null);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [vehError, setVehError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ Include all three keys so checkboxes are properly controlled
  const [consent, setConsent] = useState({
    acceptTerms: false,
    tcpConsent: true,
    marketingOptIn: false,
  });

  // Load vehicles.json only when Auto is selected
  useEffect(() => {
    if (form.type !== "Auto") return;
    let ignore = false;
    (async () => {
      try {
        setVehError("");
        setLoadingVehicles(true);
        const resp = await fetch(`${import.meta.env.BASE_URL}vehicles.json`, { cache: "force-cache" });
        if (!resp.ok) throw new Error("vehicles.json not found in /public");
        const data = await resp.json();
        if (!ignore) setVehicles(data);
      } catch (e) {
        if (!ignore) {
          setVehicles(null);
          setVehError(e.message || "Failed to load vehicle list.");
        }
      } finally {
        if (!ignore) setLoadingVehicles(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [form.type]);

  // Reset dependent selects on change
  function handleVehicleChange(name, value) {
    setForm((f) => {
      if (name === "vehicleYear") return { ...f, vehicleYear: value, vehicleMake: "", vehicleModel: "" };
      if (name === "vehicleMake") return { ...f, vehicleMake: value, vehicleModel: "" };
      if (name === "vehicleModel") return { ...f, vehicleModel: value };
      return f;
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  // --- Validation per coverage type ---
  const autoValid = form.type !== "Auto" || (form.vehicleYear && form.vehicleMake && form.vehicleModel);

  const propertyTypes = ["Homeowners", "Renters", "Landlord / DP", "Umbrella"];
  const propertyValid =
    !propertyTypes.includes(form.type) ||
    (form.propertyAddress.trim().length > 4 &&
      /^\d{4}$/.test(String(form.yearBuilt)) &&
      Number(form.yearBuilt) >= 1900 &&
      Number(form.yearBuilt) <= CURRENT_YEAR);

  const commAutoValid = form.type !== "Commercial Auto / Trucking" || form.businessName.trim().length > 1;

  const wcValid =
    form.type !== "Workers' Comp" ||
    (String(form.numEmployees).trim() !== "" &&
      String(form.annualPayroll).trim() !== "" &&
      Number(form.numEmployees) >= 1 &&
      Number(form.annualPayroll) >= 0);

  const glValid = form.type !== "General Liability" || form.businessName.trim().length > 1;

  const baseValid =
    form.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.replace(/\D/g, "").length >= 7 &&
    /^[0-9]{5}$/.test(form.zip);

  const isValid = baseValid && autoValid && propertyValid && commAutoValid && wcValid && glValid;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.company) return; // honeypot for bots
    if (!isValid) {
      setError("Please complete the required fields above.");
      return;
    }
    if (!consent.acceptTerms) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }

    try {
      setSubmitting(true);

      const fd = new FormData();
      // base
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("zip", form.zip);
      fd.append("type", form.type);
      fd.append("details", form.details);

      // Auto
      if (form.type === "Auto") {
        fd.append("vehicle_year", form.vehicleYear);
        fd.append("vehicle_make", form.vehicleMake);
        fd.append("vehicle_model", form.vehicleModel);
      }

      // Property (Homeowners/Renters/Landlord/Umbrella)
      if (propertyTypes.includes(form.type)) {
        fd.append("property_address", form.propertyAddress);
        fd.append("year_built", form.yearBuilt);
      }

      // Commercial Auto / Trucking
      if (form.type === "Commercial Auto / Trucking") {
        fd.append("business_name", form.businessName);
        if (form.dotNumber) fd.append("dot_number", form.dotNumber);
      }

      // Workers' Comp
      if (form.type === "Workers' Comp") {
        fd.append("business_name", form.businessName || "");
        fd.append("num_employees", String(form.numEmployees));
        fd.append("annual_payroll", String(form.annualPayroll));
      }

      // General Liability
      if (form.type === "General Liability") {
        fd.append("business_name", form.businessName);
        if (form.operations) fd.append("operations", form.operations);
      }

      // Subject line for Formspree
      fd.append("_subject", `New Quote Request – ${form.type} – ${form.name}`);

      // Consent values
      fd.append("Consent: Terms & Privacy", consent.acceptTerms ? "Yes" : "No");
      fd.append("Consent: TCPA", consent.tcpConsent ? "Yes" : "No");
      fd.append("Consent: Marketing", consent.marketingOptIn ? "Yes" : "No");

      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send. Please try again.");
      }

      setSuccess(true);
      // reset form + consent
      setForm({
        name: "",
        email: "",
        phone: "",
        zip: "",
        type: "Auto",
        details: "",
        vehicleYear: "",
        vehicleMake: "",
        vehicleModel: "",
        propertyAddress: "",
        yearBuilt: "",
        businessName: "",
        dotNumber: "",
        numEmployees: "",
        annualPayroll: "",
        operations: "",
        company: "",
      });
      setConsent({ acceptTerms: false, tcpConsent: true, marketingOptIn: false });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const makeOptions = useMemo(() => {
    if (!vehicles) return [];
    return Object.keys(vehicles).sort((a, b) => a.localeCompare(b));
  }, [vehicles]);

  const modelOptions = useMemo(() => {
    if (!vehicles || !form.vehicleMake) return [];
    const arr = vehicles[form.vehicleMake] || [];
    return [...arr].sort((a, b) => a.localeCompare(b));
  }, [vehicles, form.vehicleMake]);

  if (success) {
    return (
      <div className={`rounded-xl p-6 ${dark ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-900"}`}>
        <p className="text-lg font-semibold">Thanks! 🎉</p>
        <p className="mt-1 text-sm">We received your request and will reach out shortly.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Quote form">
      {/* Honeypot field (hidden) */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={`text-lg font-semibold ${dark ? "text-white" : "text-slate-900"}`}>Start your free quote</div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-500">Full name</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-500">Email</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-500">Phone</label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(215) 555-0199"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-500">ZIP</label>
          <input
            required
            name="zip"
            value={form.zip}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]{5}"
            placeholder="19142"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-500">Coverage type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
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

        {/* AUTO: Year → Make → Model */}
        {form.type === "Auto" && (
          <>
            <div>
              <label className="block text-sm text-slate-500">Year</label>
              <select
                name="vehicleYear"
                value={form.vehicleYear}
                onChange={(e) => handleVehicleChange("vehicleYear", e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-500">Make</label>
              <select
                name="vehicleMake"
                value={form.vehicleMake}
                onChange={(e) => handleVehicleChange("vehicleMake", e.target.value)}
                disabled={!vehicles || loadingVehicles}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100"
              >
                <option value="">{loadingVehicles ? "Loading makes…" : "Select make"}</option>
                {makeOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {vehError && <p className="mt-1 text-xs text-red-600">{vehError}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-slate-500">Model</label>
              <select
                name="vehicleModel"
                value={form.vehicleModel}
                onChange={(e) => handleVehicleChange("vehicleModel", e.target.value)}
                disabled={!form.vehicleMake || !vehicles}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none disabled:bg-slate-100"
              >
                <option value="">{!form.vehicleMake ? "Select make first" : "Select model"}</option>
                {modelOptions.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* PROPERTY: Homeowners / Renters / Landlord / Umbrella */}
        {["Homeowners", "Renters", "Landlord / DP", "Umbrella"].includes(form.type) && (
          <>
            <div className="sm:col-span-2">
              <label className="block text-sm text-slate-500">Property Address</label>
              <input
                required
                name="propertyAddress"
                value={form.propertyAddress}
                onChange={handleChange}
                placeholder="123 Main St, Philadelphia, PA 19142"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-500">Year Built</label>
              <input
                required
                type="number"
                name="yearBuilt"
                value={form.yearBuilt}
                onChange={handleChange}
                min={1900}
                max={CURRENT_YEAR}
                placeholder="1998"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </>
        )}

        {/* COMMERCIAL AUTO / TRUCKING */}
        {form.type === "Commercial Auto / Trucking" && (
          <>
            <div>
              <label className="block text-sm text-slate-500">Business Name</label>
              <input
                required
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="ABC Logistics LLC"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-500">USDOT Number (optional)</label>
              <input
                name="dotNumber"
                value={form.dotNumber}
                onChange={handleChange}
                placeholder="1234567"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </>
        )}

        {/* GENERAL LIABILITY */}
        {form.type === "General Liability" && (
          <>
            <div>
              <label className="block text-sm text-slate-500">Business Name</label>
              <input
                required
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="ABC Services LLC"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-slate-500">Describe your operations (optional)</label>
              <input
                name="operations"
                value={form.operations}
                onChange={handleChange}
                placeholder="e.g., residential cleaning, small remodeling, retail shop"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </>
        )}

        {/* WORKERS' COMP */}
        {form.type === "Workers' Comp" && (
          <>
            <div>
              <label className="block text-sm text-slate-500">Business Name (optional)</label>
              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="ABC Services LLC"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-500">Number of Employees</label>
              <input
                required
                type="number"
                min={1}
                name="numEmployees"
                value={form.numEmployees}
                onChange={handleChange}
                placeholder="10"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-500">Annual Payroll ($)</label>
              <input
                required
                type="number"
                min={0}
                step="1"
                name="annualPayroll"
                value={form.annualPayroll}
                onChange={handleChange}
                placeholder="500000"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-500">Notes / vehicle or property details</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder={
              form.type === "Auto"
                ? `e.g., ${form.vehicleYear || "2024"} ${form.vehicleMake || "Toyota"} ${form.vehicleModel || "Camry"}, prior incidents, current carrier`
                : propertyTypes.includes(form.type)
                ? "e.g., roof age, prior claims, renovations, alarm system"
                : form.type === "Commercial Auto / Trucking"
                ? "e.g., number of vehicles, radius, filings needed (IFTA/MC), garaging location"
                : form.type === "Workers' Comp"
                ? "e.g., class codes, subcontractor usage, workplace safety programs"
                : form.type === "General Liability"
                ? "e.g., services offered, annual revenue, certificates needed"
                : "Anything else we should know"
            }
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            rows={4}
          />
        </div>
      </div>

      {/* Consent section */}
      <ConsentFields values={consent} onChange={setConsent} dark={dark} />

      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={!isValid || submitting || !consent.acceptTerms}
        className={`w-full rounded-xl px-5 py-3 font-medium shadow ${
          !isValid || submitting || !consent.acceptTerms
            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {submitting ? "Sending..." : "Send quote request"}
      </button>

      <p className="text-xs text-slate-400">
        By submitting, you agree to be contacted by phone, text, or email about your quote. No spam—ever.
      </p>
    </form>
  );
}
