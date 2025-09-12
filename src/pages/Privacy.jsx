import React from "react";

export default function Privacy() {
  return (
    <div className="prose max-w-none px-4 py-8">
      <h1>Privacy Policy</h1>
      <p>
        This placeholder policy explains generally what data we collect and how we use it to provide insurance quotes.
        Replace with your final policy before launch.
      </p>
      <h2>Data We Collect</h2>
      <ul>
        <li>Contact info (name, email, phone, ZIP)</li>
        <li>Quote details (risk info you provide)</li>
        <li>Technical data (IP, device, etc.) via analytics if enabled</li>
      </ul>
      <h2>How We Use Data</h2>
      <ul>
        <li>To respond to quote requests and service policies</li>
        <li>To comply with legal obligations</li>
        <li>With your opt-in, to send reminders and offers</li>
      </ul>
      <h2>Your Choices</h2>
      <ul>
        <li>Request, update, or delete your data where applicable by law</li>
        <li>Opt out of marketing at any time</li>
      </ul>
      <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
