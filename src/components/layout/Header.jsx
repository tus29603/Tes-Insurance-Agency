import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header({ agencyName, phone }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <HashLink smooth to="/#home" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">TI</span>
            <span className="text-lg">{agencyName}</span>
          </HashLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <Link className="hover:text-slate-900" to="/services">Services</Link>
            <HashLink className="hover:text-slate-900" smooth to="/#products">Products</HashLink>
            <HashLink className="hover:text-slate-900" smooth to="/#why-us">Why us</HashLink>
            <Link className="hover:text-slate-900" to="/about">About</Link>
            <HashLink className="hover:text-slate-900" smooth to="/#faq">FAQ</HashLink>
            <Link className="hover:text-slate-900" to="/contact">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/quote"
              className="hidden sm:inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Get a quote
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
              <Link
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <HashLink
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                smooth to="/#products"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </HashLink>
              <HashLink
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                smooth to="/#why-us"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why us
              </HashLink>
              <Link
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <HashLink
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                smooth to="/#faq"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </HashLink>
              <Link
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/quote"
                className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
