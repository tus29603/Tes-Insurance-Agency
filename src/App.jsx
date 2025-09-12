import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/layout/Header.jsx";
import SiteFooter from "./components/layout/SiteFooter.jsx";

import Hero from "./components/sections/Hero.jsx";
import Products from "./components/sections/Products.jsx";
import WhyUs from "./components/sections/WhyUs.jsx";
// import Testimonials from "./components/sections/Testimonials.jsx"; // ← comment out if file missing
import Carriers from "./components/sections/Carriers.jsx";
import FAQ from "./components/sections/FAQ.jsx";
import Contact from "./components/sections/Contact.jsx";

// ✅ Use default imports (safer)
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import QuotePage from "./pages/QuotePage.jsx";

export default function App() {
  const AGENCY_NAME = "Tes Insurance Agency";
  const PHONE = "(215) 555-0199";
  const EMAIL = "quotes@tesinsurance.com";
  const ADDRESS = "6622 Cormorant Pl, Philadelphia, PA 19142";
  const LICENSE = "PA Lic #TBD";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header agencyName={AGENCY_NAME} phone={PHONE} />
      <main>
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Hero agencyName={AGENCY_NAME} phone={PHONE} />
                <Products />
                <WhyUs />
                {/* <Testimonials /> */}
                <Carriers />
                <FAQ />
                <Contact
                  email={EMAIL}
                  address={ADDRESS}
                  phone={PHONE}
                  license={LICENSE}
                />
              </>
            }
          />

          {/* Terms & Privacy */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Quote Page */}
          <Route path="/quote" element={<QuotePage />} />

          {/* Fallback: redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter agencyName={AGENCY_NAME} license={LICENSE} email={EMAIL} />
    </div>
  );
}
