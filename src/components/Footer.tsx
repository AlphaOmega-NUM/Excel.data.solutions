import { FileSpreadsheet } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "../data/siteConfig";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]/50 py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home");
              }}
              className="inline-flex items-center gap-2.5 text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] rounded-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--soft-green)] text-[var(--primary)] border border-[var(--border)]">
                <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-base font-bold tracking-tight">
                {SITE_CONFIG.brandName}
              </span>
            </a>
            <p className="mt-2.5 text-sm text-[var(--muted-foreground)]">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.sectionId}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.sectionId);
                }}
                className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] rounded-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-[var(--muted-foreground)]">
          <p>{SITE_CONFIG.copyright}</p>
          <p>Portfolio demonstration showcase</p>
        </div>
      </div>
    </footer>
  );
}
