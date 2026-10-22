"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    // Already in view at mount (short page, or user jumped straight here) —
    // leave it showing with the normal page-load timing, nothing to defer.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setHidden(true);

    function reveal() {
      setReplayKey((k) => k + 1);
      setHidden(false);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    // Safety net: guarantee the real content becomes visible eventually even
    // if the observer never fires, so it can never get stuck hidden.
    const timeout = setTimeout(reveal, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={ref} style={hidden ? { opacity: 0 } : undefined}>
      <div key={replayKey}>{children}</div>
    </div>
  );
}
