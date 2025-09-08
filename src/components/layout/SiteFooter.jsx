import React from "react";

export default function SiteFooter({ agencyName, license, email }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">TI</span>
              <span>{agencyName}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">Independent insurance broker serving Philadelphia and all of Pennsylvania.</p>
            <p className="mt-2 text-xs text-slate-500">{license}</p>
          </div>
          <div>
            <p className="font-medium text-slate-900">Products</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#products" className="hover:text-slate-900">Auto</a></li>
              <li><a href="#products" className="hover:text-slate-900">Homeowners</a></li>
              <li><a href="#products" className="hover:text-slate-900">Trucking</a></li>
              <li><a href="#products" className="hover:text-slate-900">Business</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-900">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#why-us" className="hover:text-slate-900">About</a></li>
              <li><a href="#faq" className="hover:text-slate-900">FAQ</a></li>
              <li><a href="#contact" className="hover:text-slate-900">Contact</a></li>
              <li><a className="hover:text-slate-900" href={`mailto:${email}`}>Careers</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-900">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a className="hover:text-slate-900" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-slate-900" href="#">Terms of Service</a></li>
              <li><a className="hover:text-slate-900" href="#">Licensing</a></li>
              <li><a className="hover:text-slate-900" href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} {agencyName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
