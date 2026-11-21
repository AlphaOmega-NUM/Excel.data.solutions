import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { SITE_CONFIG } from "../data/siteConfig";
import { resolveConfiguredLink } from "../utils/linkHelpers";
import { PlaceholderNoticeModal } from "./PlaceholderNoticeModal";

export function ContactSection() {
  const [showPlaceholderNotice, setShowPlaceholderNotice] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const contactLink = resolveConfiguredLink(SITE_CONFIG.contactUrl);

  return (
    <section
      id="contact"
      className="border-t border-[var(--border)] bg-[var(--background)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--soft-green)]/65 to-white p-8 sm:p-12 lg:p-14 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
            GET IN TOUCH
          </p>

          <h2 className="mt-3 font-bold text-[var(--foreground)] text-[clamp(30px,4vw,52px)] leading-[1.12] tracking-[-0.03em] text-balance">
            Let&apos;s Work Together
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-[1.7] text-[var(--muted-foreground)]">
            Have a spreadsheet that needs organizing, cleaning or improving? Feel free to reach out and discuss your project requirements.
          </p>

          <p className="mt-3 text-base leading-[1.7] text-[var(--foreground)]/80">
            I would be happy to explore how I can help.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            {contactLink.isConfigured && contactLink.href ? (
              <a
                href={contactLink.href}
                target={contactLink.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  contactLink.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3 text-base font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--dark-green)] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Contact Me</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowPlaceholderNotice(true)}
                  title={`Placeholder link: ${contactLink.placeholderKey}`}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3 text-base font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--dark-green)] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Contact Me</span>
                </button>
                <span className="text-xs font-medium text-[var(--muted-foreground)]">
                  Configurable placeholder link ready for setup
                </span>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <PlaceholderNoticeModal
        isOpen={showPlaceholderNotice}
        title="Contact Link Placeholder"
        placeholderKey={contactLink.placeholderKey ?? SITE_CONFIG.contactUrl}
        configLocation="src/data/siteConfig.ts"
        description="The Contact Me button uses a configurable placeholder URL so no unapproved or fabricated contact details are published. Replace SITE_CONFIG.contactUrl with your preferred email or contact URL."
        onClose={() => setShowPlaceholderNotice(false)}
      />
    </section>
  );
}
