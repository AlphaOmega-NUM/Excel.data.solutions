import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="border-t border-[var(--border)] bg-[var(--muted)]/55 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
        >
          {/* Left Column: Honest About Me Copy */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
              INTRODUCTION
            </p>
            <h2 className="mt-3 font-bold text-[var(--foreground)] text-[clamp(30px,4vw,52px)] leading-[1.12] tracking-[-0.03em] text-balance">
              About Me
            </h2>

            <div className="mt-6 space-y-5 text-base sm:text-[17px] leading-[1.7] text-[var(--muted-foreground)]">
              <p>
                I am an aspiring spreadsheet specialist focused on organizing data, improving spreadsheet usability and creating structured reports.
              </p>
              <p>
                My approach is centered on clarity, accuracy and practical solutions. I aim to make spreadsheets easier to understand, maintain and use for everyday tasks.
              </p>
              <p>
                I continuously develop my spreadsheet skills through practical projects and hands-on learning.
              </p>
            </div>
          </div>

          {/* Right Column: Decorative Abstract Spreadsheet Transformation Visual */}
          <div className="lg:col-span-6">
            <div
              aria-hidden="true"
              className="rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(24,54,36,0.04)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                  Approach to Structure
                </span>
                <span className="text-xs font-medium text-[var(--primary)]">
                  Clarity &amp; Accuracy
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-11 gap-4 items-center">
                {/* Unstructured Input Representation */}
                <div className="sm:col-span-5 rounded-xl border border-[var(--border)] bg-[var(--muted)]/60 p-4 space-y-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                    Raw Input
                  </p>
                  <div className="space-y-2 font-mono text-[11px] text-[var(--muted-foreground)]">
                    <div className="rounded bg-white/80 px-2.5 py-1.5 border border-[var(--border)]/70">
                      10/4 · item_a · $450?
                    </div>
                    <div className="rounded bg-white/80 px-2.5 py-1.5 border border-[var(--border)]/70">
                      Oct 06 | ITEM A | 450.0
                    </div>
                    <div className="rounded bg-white/80 px-2.5 py-1.5 border border-[var(--border)]/70">
                      06-10-26 / Duplicate row
                    </div>
                  </div>
                </div>

                {/* Flow Indicator */}
                <div className="sm:col-span-1 flex justify-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--soft-green)] text-[var(--primary)] border border-[var(--border)] rotate-90 sm:rotate-0">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Clean Structured Output Representation */}
                <div className="sm:col-span-5 rounded-xl border border-[var(--primary)]/25 bg-[var(--soft-green)]/45 p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                      Structured Table
                    </p>
                    <Check className="h-3.5 w-3.5 text-[var(--primary)]" />
                  </div>
                  <div className="space-y-2 text-xs text-[var(--foreground)]">
                    <div className="flex items-center justify-between rounded bg-white px-2.5 py-1.5 border border-[var(--border)] tabular-nums">
                      <span>2026-10-04</span>
                      <span className="font-semibold">$450.00</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-white px-2.5 py-1.5 border border-[var(--border)] tabular-nums">
                      <span>2026-10-06</span>
                      <span className="font-semibold">$450.00</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-white px-2.5 py-1.5 border border-[var(--border)]">
                      <span className="text-[var(--muted-foreground)]">Duplicates</span>
                      <span className="font-semibold text-[var(--primary)]">Resolved</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-5 text-center sm:text-left">
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">Consistent Format</p>
                  <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">Uniform dates &amp; types</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">Clear Layout</p>
                  <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">Easy to maintain</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">Verified Output</p>
                  <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">Checked for accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
