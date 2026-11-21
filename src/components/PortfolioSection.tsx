import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { portfolioProjects, type PortfolioProject } from "../data/portfolioProjects";
import { filterPortfolioProjects, getPortfolioCategories } from "../utils/linkHelpers";
import { PortfolioCard } from "./PortfolioCard";
import { PlaceholderNoticeModal } from "./PlaceholderNoticeModal";

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [activePlaceholder, setActivePlaceholder] = useState<{
    project: PortfolioProject;
    key: string;
  } | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const categories = useMemo(() => getPortfolioCategories(portfolioProjects), []);
  const visibleProjects = useMemo(
    () => filterPortfolioProjects(portfolioProjects, selectedCategory),
    [selectedCategory]
  );

  return (
    <section
      id="portfolio"
      className="border-t border-[var(--border)] bg-[var(--muted)]/35 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
              DEMONSTRATION WORKBOOKS
            </p>
            <h2 className="mt-3 font-bold text-[var(--foreground)] text-[clamp(30px,4vw,52px)] leading-[1.12] tracking-[-0.03em]">
              Portfolio
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-[1.7] text-[var(--muted-foreground)]">
              Explore practical spreadsheet projects demonstrating data cleaning, organization, reporting and transformation.
            </p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Each project uses synthetic demonstration data to showcase spreadsheet layout, documentation and structure.
            </p>
          </div>
        </motion.div>

        {/* Functional Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter portfolio projects by category"
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${
                  isActive
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border)] bg-white text-[var(--muted-foreground)] hover:border-[var(--primary)]/40 hover:text-[var(--foreground)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 3-Column Desktop / 2-Column Tablet / 1-Column Mobile Grid */}
        <div
          data-testid="portfolio-grid"
          className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              onPlaceholderClick={(proj, key) =>
                setActivePlaceholder({ project: proj, key })
              }
            />
          ))}
        </div>
      </div>

      <PlaceholderNoticeModal
        isOpen={activePlaceholder !== null}
        title={activePlaceholder?.project.title ?? "Project Link Placeholder"}
        placeholderKey={activePlaceholder?.key ?? ""}
        configLocation="src/data/portfolioProjects.ts"
        description="This project button is currently configured with an editable placeholder URL. Once you replace it with your live Google Sheets share link, clicking View Project will open the spreadsheet demonstration in a new browser tab."
        onClose={() => setActivePlaceholder(null)}
      />
    </section>
  );
}
