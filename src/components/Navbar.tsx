import { useEffect, useState } from "react";
import { FileSpreadsheet, Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "../data/siteConfig";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[var(--border)] shadow-[0_1px_12px_rgba(20,45,30,0.04)]"
          : "bg-white/75 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand mark + single-line wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="flex items-center gap-2.5 text-[var(--foreground)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] rounded-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--soft-green)] text-[var(--primary)] border border-[var(--border)]">
            <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-base sm:text-lg font-bold tracking-tight">
            {SITE_CONFIG.brandName}
          </span>
        </a>

        {/* Zone 2: Desktop single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.sectionId}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.sectionId);
              }}
              className="relative py-1 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-150 whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center md:hidden shrink-0">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive mobile drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-t border-[var(--border)] bg-white px-4 py-4 shadow-lg"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.sectionId}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.sectionId);
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[var(--foreground)] hover:bg-[var(--soft-green)] hover:text-[var(--primary)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
