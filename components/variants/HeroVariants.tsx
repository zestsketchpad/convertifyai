import React from "react";
import Image from "next/image";
import { ThemeConfig } from "@/lib/types";

interface HeroProps {
  headline: string;
  subheadline: string;
  imageUrl?: string;
  theme: ThemeConfig;
  cta: string;
  badge?: string;
}

export const HeroMinimal = ({ headline, subheadline, theme, cta }: HeroProps) => (
  <section className={`${theme.bg} ${theme.text} py-12 md:py-20 animate-fade-up`}>
    <div className="mx-auto max-w-4xl px-6 text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        {headline}
      </h1>
      <p className={`${theme.secondary} text-lg md:text-xl`}>
        {subheadline}
      </p>
      <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl">
        {cta}
      </button>
    </div>
  </section>
);

export const HeroBold = ({ headline, subheadline, imageUrl, theme, cta, badge }: HeroProps) => (
  <section className={`${theme.gradients.hero} ${theme.text} py-16 md:py-28 animate-fade-up`}>
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          {badge && (
            <div className="inline-block px-4 py-2 rounded-full bg-blue-100/20 border border-blue-400/30 text-sm font-semibold text-blue-400">
              {badge}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {headline}
          </h1>
          <p className={`${theme.secondary} text-lg md:text-xl`}>
            {subheadline}
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-2xl">
            {cta}
          </button>
        </div>
        {imageUrl && (
          <div className="relative h-96 rounded-lg overflow-hidden border border-white/20">
            <Image
              src={imageUrl}
              alt="Hero"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  </section>
);

export const HeroSplit = ({ headline, subheadline, imageUrl, theme, cta }: HeroProps) => (
  <section className={`${theme.bg} ${theme.text} animate-fade-up`}>
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {imageUrl && (
          <div className="relative h-96 rounded-lg overflow-hidden order-2 md:order-1 border border-white/20">
            <Image
              src={imageUrl}
              alt="Hero"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="space-y-6 order-1 md:order-2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {headline}
          </h1>
          <p className={`${theme.secondary} text-lg`}>
            {subheadline}
          </p>
          <button className={`bg-linear-to-r ${theme.gradients.btn} text-white px-8 py-3 rounded-lg font-semibold transition hover:-translate-y-0.5 hover:shadow-2xl`}>
            {cta}
          </button>
        </div>
      </div>
    </div>
  </section>
);

export const HeroLuxury = ({ headline, subheadline, imageUrl, theme, cta, badge }: HeroProps) => (
  <section className={`${theme.bg} relative overflow-hidden py-24 md:py-40 animate-fade-up`}>
    {/* Background image with overlay */}
    {imageUrl && (
      <>
        <div className="absolute inset-0 opacity-40">
          <Image
            src={imageUrl}
            alt="Hero background"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black"></div>
      </>
    )}
    
    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center space-y-8">
      {badge && (
        <div className="inline-block px-4 py-2 rounded-full bg-yellow-400/20 border border-yellow-500/50 text-sm font-semibold text-yellow-300">
          {badge}
        </div>
      )}
      <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
        {headline}
      </h1>
      <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
        {subheadline}
      </p>
      <button className={`bg-linear-to-r ${theme.gradients.btn} text-gray-900 px-10 py-4 rounded-lg font-bold text-lg transition hover:-translate-y-0.5 hover:shadow-2xl`}>
        {cta}
      </button>
    </div>
  </section>
);

export const HeroWithStats = ({ headline, subheadline, theme, cta }: HeroProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24 animate-fade-up`}>
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`${theme.accent} p-6 rounded-lg`}>
            <div className="text-3xl font-bold text-blue-600">42{i}</div>
            <div className={`${theme.secondary} text-sm mt-2`}>Metric {i}</div>
          </div>
        ))}
      </div>
      
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {headline}
        </h1>
        <p className={`${theme.secondary} text-lg`}>
          {subheadline}
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl">
          {cta}
        </button>
      </div>
    </div>
  </section>
);
