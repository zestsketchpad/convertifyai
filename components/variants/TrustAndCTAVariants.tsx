import React from "react";
import { ThemeConfig } from "@/lib/types";

interface TrustBadgesProps {
  badges: string[];
  theme: ThemeConfig;
}

interface CTAProps {
  headline: string;
  cta: string;
  theme: ThemeConfig;
}

export const TrustBadges = ({ badges, theme }: TrustBadgesProps) => (
  <section className={`${theme.bg} ${theme.text} py-12 border-y ${theme.accent}`}>
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {badges.map((badge, i) => (
          <div key={i} className="space-y-2">
            <div className="text-4xl">
              {["🏆", "✓", "★", "🔒"][i % 4]}
            </div>
            <h3 className="font-semibold text-lg">{badge}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CTABanner = ({ headline, cta, theme }: CTAProps) => (
  <section className={`${theme.gradients.hero} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        {headline}
      </h2>
      <button className={`inline-block px-10 py-4 rounded-lg font-bold text-lg transition-transform hover:scale-105 bg-gradient-to-r ${theme.gradients.btn} text-gray-900`}>
        {cta}
      </button>
    </div>
  </section>
);

export const CTAFullscreen = ({ headline, cta, theme }: CTAProps) => (
  <section className={`${theme.gradients.hero} ${theme.text} min-h-96 py-24 flex items-center justify-center relative overflow-hidden`}>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl"></div>
    </div>
    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center space-y-8">
      <h2 className="text-5xl md:text-6xl font-bold leading-tight">
        {headline}
      </h2>
      <button className={`inline-block px-12 py-5 rounded-xl font-bold text-xl transition-all hover:scale-110 hover:shadow-2xl bg-gradient-to-r ${theme.gradients.btn} text-gray-900`}>
        {cta}
      </button>
    </div>
  </section>
);

// FAQ component
interface FAQProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  theme: ThemeConfig;
}

export const FAQListDefault = ({ faqs, theme }: FAQProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-4xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className={`${theme.accent} p-6 rounded-lg cursor-pointer`}>
            <summary className="font-semibold text-lg">
              {faq.question}
            </summary>
            <p className={`${theme.secondary} mt-4`}>
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export const FAQTabbed = ({ faqs, theme }: FAQProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-4xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Questions?
      </h2>
      <div className="space-y-4">
        {faqs.slice(0, 3).map((faq, i) => (
          <div key={i} className={`${theme.accent} p-6 rounded-lg`}>
            <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
            <p className={theme.secondary}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
