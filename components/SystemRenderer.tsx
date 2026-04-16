"use client";

import React from "react";
import { Strategy, GeneratedData, ThemeConfig } from "@/lib/types";
import { createRenderPlan, explainDesignChoices } from "@/lib/render-engine";

// Import all variants
import {
  HeroMinimal,
  HeroBold,
  HeroSplit,
  HeroLuxury,
  HeroWithStats,
} from "./variants/HeroVariants";
import {
  BenefitsGrid,
  BenefitsCards,
  BenefitsSteps,
  BenefitsIcons,
} from "./variants/BenefitsVariants";
import {
  TestimonialCards,
  TestimonialCarousel,
  TestimonialQuotes,
  StatsCounters,
  StatsShowcase,
} from "./variants/TestimonialsAndStatsVariants";
import {
  TrustBadges,
  CTABanner,
  CTAFullscreen,
  FAQListDefault,
  FAQTabbed,
} from "./variants/TrustAndCTAVariants";
import {
  NavbarPremium,
  ProblemSolutionPremium,
  EcommerceOrgans,
  EcommerceCategoriesSection,
  EcommerceTrustIndicatorsSection,
  HealthcareOrgans,
  HealthcareAboutSection,
  HealthcareServicesSection,
  HealthcareAppointmentSection,
  FinanceOrgans,
  FinanceServicesSection,
  FinanceCaseStudiesSection,
  SaasOrgans,
  SaasFeaturesSection,
  SaasHowItWorksSection,
  SaasDemoPreviewSection,
  RestaurantOrgans,
  RestaurantMenuSection,
  RestaurantPopularDishesSection,
  RestaurantGallerySection,
  KeywordsCloudSection,
} from "./variants/PremiumDynamicSections";

interface SystemRendererProps {
  strategy: Strategy;
  data: GeneratedData;
  theme: ThemeConfig;
  showExplanation?: boolean;
}

export const SystemRenderer = ({
  strategy,
  data,
  theme,
  showExplanation = false,
}: SystemRendererProps) => {
  const { sections, appliedRules } = createRenderPlan(strategy, data);
  const explanation = explainDesignChoices(strategy, appliedRules);

  // Component mapping
  const componentMap: Record<string, React.ElementType> = {
    NavbarPremium,
    HeroMinimal,
    HeroBold,
    HeroSplit,
    HeroLuxury,
    HeroWithStats,
    BenefitsGrid,
    BenefitsCards,
    BenefitsSteps,
    BenefitsIcons,
    TestimonialCards,
    TestimonialCarousel,
    TestimonialQuotes,
    StatsCounters,
    StatsShowcase,
    TrustBadges,
    CTABanner,
    CTAFullscreen,
    FAQListDefault,
    FAQTabbed,
    ProblemSolutionPremium,
    EcommerceOrgans,
    EcommerceCategoriesSection,
    EcommerceTrustIndicatorsSection,
    HealthcareOrgans,
    HealthcareAboutSection,
    HealthcareServicesSection,
    HealthcareAppointmentSection,
    FinanceOrgans,
    FinanceServicesSection,
    FinanceCaseStudiesSection,
    SaasOrgans,
    SaasFeaturesSection,
    SaasHowItWorksSection,
    SaasDemoPreviewSection,
    RestaurantOrgans,
    RestaurantMenuSection,
    RestaurantPopularDishesSection,
    RestaurantGallerySection,
    KeywordsCloudSection,
  };

  return (
    <div className={`${theme.bg} ${theme.text} animate-fade-in`}>
      {/* Design explanation panel */}
      {showExplanation && (
        <div className={`${theme.accent} border-b`}>
          <div className="mx-auto max-w-6xl px-6 py-8">
            <h3 className="text-lg font-bold mb-4">Design Strategy</h3>
            <p className="mb-4">
              <strong>Summary:</strong> {explanation.summary}
            </p>
            <div className="space-y-2">
              {explanation.reasoning.map((item: { rule: string; explanation: string }, i: number) => (
                <div key={i} className="text-sm">
                  <strong>{item.rule}:</strong> {item.explanation}
                </div>
              ))}
            </div>
            <div className="text-xs mt-6 opacity-70">
              <strong>Render Plan:</strong>
              {appliedRules.map((rule: string, i: number) => (
                <div key={i}>✓ {rule}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Render sections dynamically */}
      {sections.map((section: { type: string; variant: string; props: Record<string, unknown> }, index: number) => {
        const Component = componentMap[section.variant];
        if (!Component) {
          console.warn(`No component found for variant: ${section.variant}`);
          return null;
        }

        return (
          <React.Fragment key={index}>
            <Component {...section.props} theme={theme} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
