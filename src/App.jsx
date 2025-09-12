import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header.jsx";
import SiteFooter from "./components/layout/SiteFooter.jsx";

import Hero from "./components/sections/Hero.jsx";
import Products from "./components/sections/Products.jsx";
import WhyUs from "./components/sections/WhyUs.jsx";
import Testimonials from "./components/sections/Testimonials.jsx";
import Carriers from "./components/sections/Carriers.jsx";
import FAQ from "./components/sections/FAQ.jsx";
import Contact from "./components/sections/Contact.jsx";

import QuotePage from "./pages/QuotePage.jsx";

export default function App() {
  const AGENCY_NAME = "Tes Insurance Agency";
  const PHONE = "(215) 555-0199";
  const EMAIL = "quotes@tesinsurance.com";
  const ADDRESS = "6622 Cormorant Pl, Philadelphia, PA 19142";
  const LICENSE = "PA Lic #TBD";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Shared layout */}
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
                <Testimonials />
                <Carriers />
                <FAQ />
                <Contact email={EMAIL} address={ADDRESS} phone={PHONE} license={LICENSE} />
              </>
            }
          />

          {/* Quote Page */}
          <Route path="/quote" element={<QuotePage />} />
        </Routes>
      </main>
      <SiteFooter agencyName={AGENCY_NAME} license={LICENSE} email={EMAIL} />
    </div>
  );
}
