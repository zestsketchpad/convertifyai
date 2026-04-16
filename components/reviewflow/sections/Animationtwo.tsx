"use client";

import {
  BarChart3,
  MessageSquareReply,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  WandSparkles,
} from "lucide-react";

const iconItems = [
  { href: "#features", label: "AI insights", Icon: Sparkles },
  { href: "#dashboard", label: "Review analytics", Icon: BarChart3 },
  { href: "#reviews", label: "Fast replies", Icon: MessageSquareReply },
  { href: "#pricing", label: "Growth signals", Icon: TrendingUp },
  { href: "#submit", label: "Brand safety", Icon: ShieldCheck },
  { href: "#home", label: "Delight customers", Icon: Star },
  { href: "#how-it-works", label: "AI magic", Icon: WandSparkles },
];

export default function InfinityBandScroll() {
  return (
    <section
      style={{
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        width: "100vw",
        background: "var(--white)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "block",
          overflow: "hidden",
          padding: "24px 0",
          boxSizing: "border-box",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 128px, black calc(100% - 200px), transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, black 128px, black calc(100% - 200px), transparent 100%)",
        }}
      >
        <div className="infinity-band-track" aria-label="Product highlights">
          {[0, 1, 2, 3].map((groupIndex) => (
            <ul key={groupIndex} className="infinity-band-group" aria-hidden={groupIndex !== 0}>
              {iconItems.map(({ href, label, Icon }) => (
                <li key={`${groupIndex}-${label}`} style={{ margin: "0 1.25rem" }}>
                  <a
                    href={href}
                    aria-label={label}
                    className="border"
                    style={{
                      width: 60,
                      height: 60,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 12,
                      background: "var(--brand-light)",
                      color: "var(--brand-dark)",
                      borderColor: "var(--border)",
                      textDecoration: "none",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <Icon size={24} strokeWidth={2.25} />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <style>{`
        .infinity-band-track {
          display: flex;
          width: max-content;
          animation: infinity-band-scroll 12s linear infinite;
          will-change: transform;
        }

        .infinity-band-group {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          width: max-content;
        }

        @keyframes infinity-band-scroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </section>
  );
}
