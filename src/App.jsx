import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/layout/Header.jsx";
import SiteFooter from "./components/layout/SiteFooter.jsx";

import Hero from "./components/sections/Hero.jsx";
import Products from "./components/sections/Products.jsx";
import WhyUs from "./components/sections/WhyUs.jsx";
import Carriers from "./components/sections/Carriers.jsx";
import FAQ from "./components/sections/FAQ.jsx";
import ContactSection from "./components/sections/Contact.jsx";

// ✅ Use default imports (safer)
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import QuotePage from "./pages/QuotePage.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const AGENCY_NAME = "Tes Insurance Agency";
  const PHONE = "(215) 555-0199";
  const EMAIL = "quotes@tesinsurance.com";
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
                <Carriers />
                <FAQ />
                <ContactSection
                  email={EMAIL}
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

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Services Page */}
          <Route path="/services" element={<Services />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

          {/* 404 Page */}
          <Route path="/404" element={<NotFound />} />

          {/* Fallback: redirect unknown paths to 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter agencyName={AGENCY_NAME} license={LICENSE} email={EMAIL} />
    </div>
  );
}
