import type { PortfolioProject } from "../data/portfolioProjects";

export interface LinkResolution {
  isConfigured: boolean;
  href: string | null;
  placeholderKey: string | null;
}

const PLACEHOLDER_PREFIX = "REPLACE_WITH_";

export function isPlaceholderUrl(url: string | undefined | null): boolean {
  if (!url) return true;
  const trimmed = url.trim();
  if (trimmed.length === 0) return true;
  return trimmed.startsWith(PLACEHOLDER_PREFIX);
}

export function isSafeExternalUrl(url: string | undefined | null): boolean {
  if (!url || isPlaceholderUrl(url)) return false;
  const trimmed = url.trim();
  if (trimmed.startsWith("mailto:")) {
    return trimmed.length > "mailto:".length && trimmed.includes("@");
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function resolveConfiguredLink(url: string | undefined | null): LinkResolution {
  if (!url || url.trim().length === 0) {
    return {
      isConfigured: false,
      href: null,
      placeholderKey: "UNCONFIGURED_URL",
    };
  }

  const trimmed = url.trim();
  if (trimmed.startsWith(PLACEHOLDER_PREFIX)) {
    return {
      isConfigured: false,
      href: null,
      placeholderKey: trimmed,
    };
  }

  if (isSafeExternalUrl(trimmed)) {
    return {
      isConfigured: true,
      href: trimmed,
      placeholderKey: null,
    };
  }

  return {
    isConfigured: false,
    href: null,
    placeholderKey: trimmed,
  };
}

export function getPortfolioCategories(projects: PortfolioProject[]): string[] {
  const seen = new Set<string>();
  const categories: string[] = [];
  for (const project of projects) {
    if (!seen.has(project.category)) {
      seen.add(project.category);
      categories.push(project.category);
    }
  }
  return ["All Projects", ...categories];
}

export function filterPortfolioProjects(
  projects: PortfolioProject[],
  selectedCategory: string
): PortfolioProject[] {
  if (!selectedCategory || selectedCategory === "All Projects") {
    return projects;
  }
  return projects.filter((project) => project.category === selectedCategory);
}
