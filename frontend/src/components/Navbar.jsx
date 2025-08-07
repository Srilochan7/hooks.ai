import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // An array for navigation links to avoid repetition
  const navLinks = [
    { href: '#platform', text: 'Platform' },
    { href: '#use-cases', text: 'Use Cases' },
    { href: '#resources', text: 'Resources' },
    { href: '#pricing', text: 'Pricing' },
    { href: '#ai-tools', text: 'AI Tools' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <a href="/" className="flex items-center space-x-2">
              <img
                className="h-18 w-auto" // Adjusted height to fit within the h-16 navbar
                src="../logo.png" // Using a placeholder for demonstration
                alt="hook.ai logo"
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <a
              href="#login"
              className="px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              Login
            </a>
            <a
              href="#demo"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 hover:shadow-md"
            >
              Get a Demo
            </a>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                {link.text}
              </a>
            ))}
          </div>
          
          {/* Mobile CTA Buttons */}
          <div className="space-y-3 border-t border-gray-200 px-4 py-4">
            <a
              href="#login"
              className="block rounded-md px-3 py-2 text-center text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              Login
            </a>
            <a
              href="#demo"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Get a Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;