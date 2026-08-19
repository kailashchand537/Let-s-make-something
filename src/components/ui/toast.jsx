import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minimal shadcn-shaped toast: same `useToast()` / `<Toaster />` API as the
 * Radix version, without the dependency. Toasts land top-centre so they read
 * on a projector instead of hiding in a corner.
 */
const ToastContext = React.createContext(null);

let idCounter = 0;

export function ToastProvider({ children, duration = 2600 }) {
  const [toasts, setToasts] = React.useState([]);
  const timers = React.useRef(new Map());

  const dismiss = React.useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = React.useCallback(
    ({ title, description, variant = "default" }) => {
      const id = ++idCounter;
      // Presentation mode: only ever one toast on screen, so a rapid-fire
      // round of wrong guesses can't stack up and cover the question.
      setToasts(() => {
        timers.current.forEach(clearTimeout);
        timers.current.clear();
        return [{ id, title, description, variant }];
      });
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration)
      );
      return id;
    },
    [dismiss, duration]
  );

  React.useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss, toasts }), [toast, dismiss, toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context;
}

const toastStyles = {
  default: "border-mp-ink-line bg-mp-ink-raised text-mp-paper-base",
  success: "border-mp-correct bg-mp-correct text-mp-correct-ink",
  destructive: "border-mp-wrong bg-mp-wrong text-mp-paper-pure",
};

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-x-0 top-8 z-50 flex flex-col items-center gap-3 px-8"
    >
      {toasts.map(({ id, title, description, variant }) => (
        <div
          key={id}
          className={cn(
            "pointer-events-auto flex w-full max-w-2xl items-center gap-5 rounded-pill border-2 px-10 py-5 shadow-tile-hover animate-toast-in",
            toastStyles[variant] ?? toastStyles.default
          )}
        >
          <div className="flex-1">
            <p className="font-display text-display-md leading-none">{title}</p>
            {description ? (
              <p className="mt-2 text-body-lg opacity-80">{description}</p>
            ) : null}
          </div>
          <button
            onClick={() => dismiss(id)}
            aria-label="Dismiss"
            className="rounded-pill p-2 opacity-60 transition-opacity hover:opacity-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      ))}
    </div>
  );
}
