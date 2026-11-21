import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, ExternalLink, FileSpreadsheet } from "lucide-react";
import type { PortfolioProject } from "../data/portfolioProjects";
import { resolveConfiguredLink } from "../utils/linkHelpers";

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
  onPlaceholderClick: (project: PortfolioProject, placeholderKey: string) => void;
}

export function PortfolioCard({
  project,
  index,
  onPlaceholderClick,
}: PortfolioCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const linkState = resolveConfiguredLink(project.projectUrl);

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[var(--primary)]/45 hover:shadow-[0_14px_34px_rgba(24,54,36,0.07)]"
    >
      {/* 4:3 Thumbnail with Zero-Broken-Image Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--soft-green)]/50">
        {!imageFailed ? (
          <img
            src={project.image}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--soft-green)] to-[var(--muted)] p-6 text-center">
            <FileSpreadsheet className="h-8 w-8 text-[var(--primary)]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Clean Unboxed Category Metadata */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
            {project.category}
          </span>
          {!linkState.isConfigured && (
            <span className="text-[11px] font-medium text-[var(--muted-foreground)]">
              Placeholder Link
            </span>
          )}
        </div>

        <h3 className="mt-2.5 font-bold text-[var(--foreground)] text-xl leading-snug">
          {project.title}
        </h3>

        <p className="mt-2.5 text-sm sm:text-[15px] leading-[1.65] text-[var(--muted-foreground)]">
          {project.description}
        </p>

        {/* Expandable Supporting Details from Section 7 */}
        <div className="mt-3">
          <button
            type="button"
            aria-expanded={detailsExpanded}
            onClick={() => setDetailsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--dark-green)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] rounded-sm"
          >
            <span>{detailsExpanded ? "Hide project notes" : "Project notes"}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-150 ${
                detailsExpanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {detailsExpanded && (
            <p className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--muted)]/55 p-3 text-xs sm:text-[13px] leading-[1.6] text-[var(--foreground)]/85">
              {project.supportingDetails}
            </p>
          )}
        </div>

        {/* Key Features List */}
        <div className="mt-5 border-t border-[var(--border)] pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            Key Features
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-xs sm:text-[13px] text-[var(--foreground)]/85"
              >
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--primary)]"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Action */}
        <div className="mt-auto pt-6">
          {linkState.isConfigured && linkState.href ? (
            <a
              href={linkState.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] transition-all duration-150 hover:bg-[var(--dark-green)] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              <span>View Project</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() =>
                onPlaceholderClick(
                  project,
                  linkState.placeholderKey ?? "REPLACE_WITH_GOOGLE_SHEETS_URL"
                )
              }
              title={`Placeholder link: ${linkState.placeholderKey}`}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--primary)]/35 bg-[var(--soft-green)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-all duration-150 hover:bg-[var(--primary)] hover:text-white whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              <span>View Project</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
