export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export const SITE_CONFIG = {
  brandName: "Excel Data Solutions",
  tagline: "Making Data Easier to Understand.",
  copyright: "© 2026 Excel Data Solutions",
  /**
   * Replace this placeholder with your approved contact URL
   * (e.g., "mailto:your-email@example.com" or an external contact page URL).
   */
  contactUrl: "REPLACE_WITH_APPROVED_CONTACT_LINK",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "Services", href: "#services", sectionId: "services" },
  { label: "Portfolio", href: "#portfolio", sectionId: "portfolio" },
  { label: "About", href: "#about", sectionId: "about" },
];
