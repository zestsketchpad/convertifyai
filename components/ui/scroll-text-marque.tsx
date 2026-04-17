"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

type ScrollBaseAnimationProps = {
  children: ReactNode;
  delay?: number;
  baseVelocity?: number;
  className?: string;
  clasname?: string;
  scrollDependent?: boolean;
};

export default function ScrollBaseAnimation({
  children,
  delay = 0,
  baseVelocity = 3,
  className,
  clasname,
  scrollDependent = false,
}: ScrollBaseAnimationProps) {
  const [velocityMultiplier, setVelocityMultiplier] = useState(1);

  useEffect(() => {
    if (!scrollDependent) return;

    let lastY = window.scrollY;
    let timeoutId: number | null = null;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      lastY = currentY;

      if (Math.abs(delta) < 1) {
        setVelocityMultiplier(1);
        return;
      }

      const direction = delta > 0 ? 1 : -1;
      setVelocityMultiplier(direction * (1 + Math.min(Math.abs(delta) / 80, 2)));

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        setVelocityMultiplier(1);
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [scrollDependent]);

  const effectiveVelocity = useMemo(() => {
    return scrollDependent ? baseVelocity * velocityMultiplier : baseVelocity;
  }, [baseVelocity, scrollDependent, velocityMultiplier]);

  const duration = Math.max(8, 30 / Math.max(1, Math.abs(effectiveVelocity)));
  const direction = effectiveVelocity >= 0 ? "normal" : "reverse";

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          minWidth: "200%",
          animationName: "scroll-marquee",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction,
          animationDelay: `${delay}ms`,
          willChange: "transform",
        }}
      >
        <span
          className={className ?? clasname}
          style={{
            display: "inline-block",
            marginRight: "2rem",
            fontSize: "clamp(32px, 5vw, 72px)",
            color: "var(--text)",
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {children}
        </span>
        <span
          className={className ?? clasname}
          style={{
            display: "inline-block",
            marginRight: "2rem",
            fontSize: "clamp(32px, 5vw, 72px)",
            color: "var(--text)",
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
          {children}
        </span>
      </div>
      <style>{`
        @keyframes scroll-marquee {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
