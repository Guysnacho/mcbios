"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#speakers", label: "Speakers" },
    { href: "#schedule", label: "Schedule" },
    { href: "#registration", label: "Register" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[var(--maroon)]/95 backdrop-blur-sm border-b border-[var(--gold)]/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center p-2">
              <Image
                src="/img/logo_clippy_clean.png"
                alt="MCBIOS Logo"
                className="w-full h-full object-contain"
                width={30}
                height={30}
              />
            </div>
            <div>
              <h1 className="text-[var(--off-white)] font-bold text-xl">
                MCBIOS 2026
              </h1>
              <p className="text-[var(--off-white)]/80 text-sm">
                Florida Conference
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[var(--off-white)] hover:text-[var(--gold)] transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--gold)] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Button
              variant="outline"
              className="border-[var(--off-white)] text-[var(--off-white)] hover:bg-[var(--off-white)] hover:text-[var(--maroon)] font-medium"
            >
              Register Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[var(--off-white)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[var(--gold)]/30 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[var(--off-white)] hover:text-[var(--gold)] transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button
                variant="outline"
                className="border-[var(--off-white)] text-[var(--off-white)] hover:bg-[var(--off-white)] hover:text-[var(--maroon)] font-medium mt-4"
              >
                Register Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
