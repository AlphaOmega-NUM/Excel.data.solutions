import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HeroSpreadsheetVisual } from "./HeroSpreadsheetVisual";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[var(--background)] pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      {/* Effect 1: Soft Green Ambient Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 18, -10, 0],
                  y: [0, -14, 10, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute -top-28 -left-24 h-[440px] w-[440px] rounded-full opacity-55 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsla(142, 40%, 84%, 0.75) 0%, hsla(145, 32%, 94%, 0) 70%)",
          }}
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -20, 12, 0],
                  y: [0, 16, -12, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute top-12 right-0 h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsla(145, 36%, 86%, 0.65) 0%, hsla(140, 20%, 96%, 0) 72%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[340px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsla(42, 24%, 92%, 0.75) 0%, hsla(0, 0%, 100%, 0) 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Text Column */}
          <div className="lg:col-span-6 min-w-0">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--primary)]"
            >
              SPREADSHEET SOLUTIONS
            </motion.p>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-extrabold text-[var(--foreground)] text-[clamp(44px,5.2vw,76px)] leading-[1.05] tracking-[-0.04em] text-balance"
            >
              Making Data Easier to Understand.
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-[1.7] text-[var(--muted-foreground)]"
            >
              We help organize, clean and structure spreadsheet data to make everyday data management clearer, more efficient and easier to work with.
            </motion.p>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 max-w-xl text-base leading-[1.7] text-[var(--foreground)]/80"
            >
              Explore our spreadsheet projects and see how organized data can make a difference.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => onNavigate("portfolio")}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm sm:text-base font-semibold text-[var(--primary-foreground)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--dark-green)] active:translate-y-0 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("services")}
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-[var(--border)] bg-white px-6 py-3 text-sm sm:text-base font-semibold text-[var(--foreground)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[var(--primary)]/50 hover:bg-[var(--soft-green)]/50 active:translate-y-0 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                Our Services
              </button>
            </motion.div>
          </div>

          {/* Right Spreadsheet Visual Column */}
          <div className="lg:col-span-6 min-w-0">
            <HeroSpreadsheetVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
