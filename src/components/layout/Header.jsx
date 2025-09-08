import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

export default function Header({ agencyName, phone }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <HashLink smooth to="/#home" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">TI</span>
            <span className="text-lg">{agencyName}</span>
          </HashLink>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <HashLink className="hover:text-slate-900" smooth to="/#products">Products</HashLink>
            <HashLink className="hover:text-slate-900" smooth to="/#why-us">Why us</HashLink>
            <HashLink className="hover:text-slate-900" smooth to="/#faq">FAQ</HashLink>
            <HashLink className="hover:text-slate-900" smooth to="/#contact">Contact</HashLink>
          </nav>

          <Link
            to="/quote"
            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
