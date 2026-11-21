import { motion, useReducedMotion } from "motion/react";
import { BarChart3, Filter, TableProperties } from "lucide-react";

const SERVICES = [
  {
    id: "excel-data-cleaning",
    title: "Excel Data Cleaning",
    description:
      "Cleaning, correcting and standardizing spreadsheet data to improve consistency and readability.",
    icon: Filter,
  },
  {
    id: "spreadsheet-organization",
    title: "Spreadsheet Organization",
    description:
      "Organizing messy records, restructuring tables and improving spreadsheet layouts.",
    icon: TableProperties,
  },
  {
    id: "reports-dashboards",
    title: "Reports & Dashboards",
    description:
      "Creating clear reports and visual summaries that help users understand their data.",
    icon: BarChart3,
  },
];

export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="border-t border-[var(--border)] bg-subtle-grid py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
            CAPABILITIES
          </p>
          <h2 className="mt-3 font-bold text-[var(--foreground)] text-[clamp(30px,4vw,52px)] leading-[1.12] tracking-[-0.03em]">
            Services
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-[1.7] text-[var(--muted-foreground)]">
            Practical spreadsheet solutions designed to improve organization, clarity and usability.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group rounded-2xl border border-[var(--border)] bg-white p-7 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--primary)]/45 hover:shadow-[0_12px_32px_rgba(24,54,36,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--soft-green)] text-[var(--primary)] border border-[var(--border)]/70 transition-colors duration-200 group-hover:bg-[var(--accent)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="mt-6 font-bold text-[var(--foreground)] text-[clamp(20px,2vw,26px)] leading-snug">
                  {service.title}
                </h3>

                <p className="mt-3 text-base leading-[1.7] text-[var(--muted-foreground)]">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
