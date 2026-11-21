import { useEffect } from "react";
import { Info, X } from "lucide-react";

interface PlaceholderNoticeModalProps {
  isOpen: boolean;
  title: string;
  placeholderKey: string;
  configLocation: string;
  description: string;
  onClose: () => void;
}

export function PlaceholderNoticeModal({
  isOpen,
  title,
  placeholderKey,
  configLocation,
  description,
  onClose,
}: PlaceholderNoticeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="placeholder-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--dark-green)]/35 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--soft-green)] text-[var(--primary)]">
              <Info className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                Placeholder Link
              </p>
              <h3
                id="placeholder-modal-title"
                className="text-lg font-bold text-[var(--foreground)]"
              >
                {title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close notice"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-[1.65] text-[var(--muted-foreground)]">
          {description}
        </p>

        <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--muted)]/70 p-3.5 text-xs">
          <p className="font-semibold text-[var(--foreground)]">
            Configured key in <code className="font-mono">{configLocation}</code>:
          </p>
          <p className="mt-1.5 break-all font-mono text-[var(--primary)]">
            {placeholderKey}
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--dark-green)] transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
