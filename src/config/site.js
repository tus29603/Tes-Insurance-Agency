const SITE = {
  AGENCY_NAME: import.meta.env.VITE_AGENCY_NAME || "Tes Insurance Agency",
  PHONE: import.meta.env.VITE_PHONE || "(215) 555-0199",         // TODO: replace
  EMAIL: import.meta.env.VITE_EMAIL || "info@tesinsurance.com",// TODO: replace
  ADDRESS: import.meta.env.VITE_ADDRESS || "6622 Cormorant Pl, Philadelphia, PA 19142", // TODO
  LICENSE: import.meta.env.VITE_LICENSE || "PA Lic #TBD",          // TODO
  FORMSPREE_ID: import.meta.env.VITE_FORMSPREE_ID || "xzzaowkq",
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || "",
  PLAUSIBLE_DOMAIN: import.meta.env.VITE_PLAUSIBLE_DOMAIN || "",
};
export default SITE;
