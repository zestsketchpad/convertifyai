import React from "react";
import { ThemeConfig } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Array<{
    name: string;
    review: string;
  }>;
  theme: ThemeConfig;
}

interface StatsProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
  theme: ThemeConfig;
}

export const TestimonialCards = ({ testimonials, theme }: TestimonialsProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, i) => (
          <div key={i} className={`${theme.accent} p-8 rounded-lg space-y-4`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <div className="text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p className={theme.secondary}>"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const TestimonialCarousel = ({ testimonials, theme }: TestimonialsProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-4xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Loved by Our Customers
      </h2>
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-8 md:p-12">
        {testimonials.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
                {testimonials[0].name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-bold">{testimonials[0].name}</h4>
                <div className="text-yellow-400">★★★★★</div>
              </div>
            </div>
            <p className="text-lg leading-relaxed">
              "{testimonials[0].review}"
            </p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export const TestimonialQuotes = ({ testimonials, theme }: TestimonialsProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-6xl px-6">
      <div className="space-y-8">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="space-y-3">
            <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed border-l-4 border-blue-600 pl-6">
              "{testimonial.review}"
            </blockquote>
            <p className="font-semibold">— {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const StatsCounters = ({ stats, theme }: StatsProps) => (
  <section className={`${theme.gradients.hero} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-blue-400">
              {stat.value}
            </div>
            <p className="text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const StatsShowcase = ({ stats, theme }: StatsProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        By The Numbers
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className={`${theme.accent} p-8 rounded-lg text-center`}>
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {stat.value}
            </div>
            <p className="text-lg font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
