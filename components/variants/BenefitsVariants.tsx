import React from "react";
import { ThemeConfig } from "@/lib/types";

interface BenefitsProps {
  benefits: string[];
  theme: ThemeConfig;
}

export const BenefitsGrid = ({ benefits, theme }: BenefitsProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Why Choose Us
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, i) => (
          <div key={i} className={`${theme.accent} p-8 rounded-lg`}>
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
              ✓
            </div>
            <h3 className="text-xl font-semibold mb-3">{benefit}</h3>
            <p className={theme.secondary}>
              Get the best results with our proven approach.
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const BenefitsCards = ({ benefits, theme }: BenefitsProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Key Benefits
      </h2>
      <div className="space-y-6">
        {benefits.map((benefit, i) => (
          <div key={i} className={`${theme.accent} p-8 rounded-lg flex items-start gap-4`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
              {i + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{benefit}</h3>
              <p className={theme.secondary}>
                Experience the difference that quality makes.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const BenefitsSteps = ({ benefits, theme }: BenefitsProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-4xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        How It Works
      </h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600 transform -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {benefits.map((benefit, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
              <div className="md:text-right">
                <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-bold mb-4">
                  Step {i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-3">{benefit}</h3>
                <p className={theme.secondary}>
                  Follow this step to get the best results.
                </p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-2xl">
                  {i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const BenefitsIcons = ({ benefits, theme }: BenefitsProps) => (
  <section className={`${theme.bg} ${theme.text} py-16 md:py-24`}>
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        What You Get
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {benefits.map((benefit, i) => (
          <div key={i} className="text-center space-y-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center mx-auto text-2xl">
              {["⚡", "🎯", "💎", "🚀"][i % 4]}
            </div>
            <h3 className="font-semibold text-lg">{benefit}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);
