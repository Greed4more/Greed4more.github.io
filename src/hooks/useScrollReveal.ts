import { useEffect } from "react";

// Hook: when mounted, observe elements with [data-reveal] and toggle .reveal-active
export default function useScrollReveal(rootMargin = "0px 0px -10% 0px") {
  useEffect(() => {
    if (typeof window === "undefined" || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("reveal-active");
            // optionally unobserve once revealed
            observer.unobserve(el);
          }
        }
      },
      { root: null, rootMargin }
    );

    const nodes = Array.from(document.querySelectorAll('[data-reveal]')) as HTMLElement[];
    nodes.forEach((n) => {
      n.classList.add("reveal");
      observer.observe(n);
    });

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);
}
