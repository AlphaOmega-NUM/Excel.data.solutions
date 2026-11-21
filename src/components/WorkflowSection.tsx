import { motion, useReducedMotion } from "motion/react";
import {
  CheckCheck,
  FileSearch,
  MessageSquareText,
  Send,
  SlidersHorizontal,
} from "lucide-react";

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Project Discussion",
    description:
      "Understand the client's requirements, goals and spreadsheet challenges.",
    icon: MessageSquareText,
  },
  {
    number: "02",
    title: "Data Assessment",
    description:
      "Review the spreadsheet structure and determine the appropriate improvements.",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Organize, clean and improve the spreadsheet according to the agreed scope.",
    icon: SlidersHorizontal,
  },
  {
    number: "04",
    title: "Quality Review",
    description:
      "Review the completed work and verify data consistency and accuracy.",
    icon: CheckCheck,
  },
  {
    number: "05",
    title: "Delivery",
    description:
      "Deliver the completed spreadsheet and communicate the results.",
    icon: Send,
  },
];

export function WorkflowSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="workflow" className="bg-[var(--background)] py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
            PROCESS
          </p>
          <h2 className="mt-3 font-bold text-[var(--foreground)] text-[clamp(30px,4vw,52px)] leading-[1.12] tracking-[-0.03em]">
            My Workflow
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-[1.7] text-[var(--muted-foreground)]">
            A structured approach to every spreadsheet project.
          </p>
        </motion.div>

        {/* Desktop horizontal connected cards / Mobile vertical timeline */}
        <div className="relative mt-14">
          {/* Desktop subtle horizontal connecting line */}
          <motion.div
            aria-hidden="true"
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="hidden lg:block absolute top-8 left-8 right-8 h-px bg-[var(--border)]"
          />

          {/* Mobile/Tablet vertical connecting line */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute top-6 bottom-6 left-5 w-px bg-[var(--border)]"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-5">
            {WORKFLOW_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex lg:flex-col items-start gap-4 lg:gap-5 pl-0"
                >
                  {/* Step Node */}
                  <div className="relative z-10 flex h-10 w-10 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--soft-green)] text-[var(--primary)] shadow-xs">
                    <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                  </div>

                  {/* Step Card */}
                  <div className="flex-1 rounded-2xl border border-[var(--border)] bg-white p-5 transition-colors duration-150 hover:border-[var(--primary)]/40">
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)] tabular-nums">
                      {step.number}. {step.title}
                    </span>
                    <p className="mt-2.5 text-sm sm:text-[15px] leading-[1.65] text-[var(--muted-foreground)]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
