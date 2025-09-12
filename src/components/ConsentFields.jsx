import React from "react";

/**
 * Reusable consent section (HashRouter-friendly).
 * Hidden inputs ensure values land in Formspree/email parsers.
 */
export default function ConsentFields({
  values = { acceptTerms: false, tcpConsent: true, marketingOptIn: false },
  onChange = () => {},
  dark = false,
}) {
  const labelCls = `block text-sm ${dark ? "text-gray-200" : "text-gray-700"}`;
  const helperCls = `mt-1 text-xs ${dark ? "text-gray-400" : "text-gray-500"}`;

  return (
    <fieldset className="space-y-4 rounded-2xl border p-4 sm:p-5">
      <legend className={`px-1 text-sm font-semibold ${dark ? "text-gray-100" : "text-gray-900"}`}>
        Privacy, Terms & Consent
      </legend>

      {/* Mandatory: Terms & Privacy */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={values.acceptTerms}
          onChange={(e) => onChange({ ...values, acceptTerms: e.target.checked })}
          required
          className="mt-1 h-4 w-4 rounded border-gray-300"
          aria-describedby="acceptTerms-help"
        />
        <span className={labelCls}>
          I agree to the{" "}
          <a href="#/terms" className="underline hover:no-underline">Terms of Use</a>{" "}
          and the{" "}
          <a href="#/privacy" className="underline hover:no-underline">Privacy Policy</a>.
          <div id="acceptTerms-help" className={helperCls}>
            Required to submit the request.
          </div>
        </span>
      </label>

      {/* TCPA Consent (recommended for calls/texts) */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="tcpConsent"
          checked={values.tcpConsent}
          onChange={(e) => onChange({ ...values, tcpConsent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-gray-300"
          aria-describedby="tcp-consent-help"
        />
        <span className={labelCls}>
          I consent to be contacted at the phone and email I provided, including by auto-dialed or prerecorded calls and text
          messages for insurance-related purposes. Consent is not a condition of purchase. Message/data rates may apply.
          <div id="tcp-consent-help" className={helperCls}>Optional but recommended if you will call/text leads.</div>
        </span>
      </label>

      {/* Marketing opt-in */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="marketingOptIn"
          checked={values.marketingOptIn}
          onChange={(e) => onChange({ ...values, marketingOptIn: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-gray-300"
          aria-describedby="marketing-help"
        />
        <span className={labelCls}>
          Keep me updated with policy reminders, renewal alerts, and occasional promos via email/text.
          <div id="marketing-help" className={helperCls}>Optional.</div>
        </span>
      </label>

      {/* Hidden mirrors for parsers */}
      <input type="hidden" name="Consent: Terms & Privacy" value={values.acceptTerms ? "Yes" : "No"} />
      <input type="hidden" name="Consent: TCPA" value={values.tcpConsent ? "Yes" : "No"} />
      <input type="hidden" name="Consent: Marketing" value={values.marketingOptIn ? "Yes" : "No"} />
    </fieldset>
  );
}
