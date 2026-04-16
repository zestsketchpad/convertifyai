"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ThemeConfig } from "@/lib/types";
import { getOpenImageSources } from "@/lib/icons";

type SharedProps = {
  theme: ThemeConfig;
  industry?: string;
  tone?: string;
};

type MediaProps = {
  industry: string;
  section: string;
  alt: string;
  className?: string;
};

function SmartMedia({ industry, section, alt, className }: MediaProps) {
  const [index, setIndex] = useState(0);
  const { sources } = useMemo(
    () => getOpenImageSources(industry, section, `${industry}-${section}`),
    [industry, section],
  );

  const current = sources[Math.min(index, sources.length - 1)];

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/15 ${className || "h-72"}`}>
      <Image
        src={current}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 hover:scale-105"
        onError={() => setIndex((i) => (i + 1 < sources.length ? i + 1 : i))}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}

export function NavbarPremium({ theme, industry }: SharedProps) {
  const links =
    industry === "ecommerce"
      ? ["Shop", "Categories", "Deals", "Reviews"]
      : industry === "healthcare"
        ? ["Doctors", "Services", "Patients", "Contact"]
        : industry === "finance"
          ? ["Plans", "Security", "Results", "Contact"]
          : ["Features", "How it Works", "Pricing", "Contact"];

  return (
    <header className={`${theme.bg} sticky top-0 z-20 border-b border-white/10 backdrop-blur-xl`}> 
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold tracking-wide">Elevate</div>
        <nav className="hidden gap-6 text-sm md:flex">
          {links.map((link) => (
            <a key={link} href="#" className="opacity-80 transition hover:opacity-100">
              {link}
            </a>
          ))}
        </nav>
        <button className="rounded-xl border border-white/20 px-4 py-2 text-sm transition hover:scale-105 hover:bg-white/10">
          Get Started
        </button>
      </div>
    </header>
  );
}

export function ProblemSolutionPremium({
  theme,
  painPoints,
  benefits,
}: SharedProps & { painPoints: string[]; benefits: string[] }) {
  const problem = painPoints[0] || "Users need stronger confidence before acting.";
  const solution = benefits[0] || "Clear outcomes with measurable value";

  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16 md:py-24`}>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-red-400/25 bg-red-500/10 p-8 shadow-[0_8px_30px_rgba(239,68,68,0.15)]">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-red-300">Problem</p>
          <h3 className="text-2xl font-semibold">{problem}</h3>
        </article>
        <article className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-8 shadow-[0_8px_30px_rgba(16,185,129,0.15)]">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-300">Solution</p>
          <h3 className="text-2xl font-semibold">{solution}</h3>
        </article>
      </div>
    </section>
  );
}

export function EcommerceOrgans({ theme }: SharedProps) {
  const products = [
    { name: "Signature Product", price: "$89", rating: "4.8" },
    { name: "Best Seller", price: "$129", rating: "4.9" },
    { name: "Limited Drop", price: "$159", rating: "4.7" },
  ];

  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16 md:py-24`}>
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold md:text-4xl">Shop By Product</h2>
          <button className="rounded-lg border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10">View all</button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <article key={p.name} className="group rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:-translate-y-1 hover:shadow-2xl">
              <SmartMedia industry="ecommerce" section="gallery" alt={`${p.name} preview`} className="h-56" />
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">{p.name}</h3>
                <span className="text-sm opacity-80">{p.rating} star</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xl font-semibold">{p.price}</p>
                <button className="rounded-lg bg-white/90 px-3 py-1 text-sm font-medium text-black transition group-hover:scale-105">
                  Quick Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EcommerceCategoriesSection({ theme }: SharedProps) {
  const categories = ["New Arrivals", "Best Sellers", "Premium Collection", "Essentials"];

  return (
    <section className={`${theme.bg} ${theme.text} px-6 pb-16`}>
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-5 text-2xl font-semibold">Shop by Category</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <span key={cat} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EcommerceTrustIndicatorsSection({ theme }: SharedProps) {
  const points = ["Free shipping", "30-day returns", "Secure payments"]; 
  return (
    <section className={`${theme.bg} ${theme.text} px-6 pb-16`}>
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {points.map((point) => (
          <article key={point} className="rounded-xl border border-white/15 bg-white/5 p-5 text-center">
            <p className="text-sm tracking-wide opacity-75">Trust Signal</p>
            <p className="mt-2 text-lg font-semibold">{point}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HealthcareOrgans({ theme }: SharedProps) {
  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16 md:py-24`}>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-white/15 bg-white/5 p-7">
          <p className="text-xs uppercase tracking-[0.2em] opacity-80">About Clinic</p>
          <h3 className="mt-3 text-2xl font-semibold">20+ Years of Trusted Care</h3>
          <p className="mt-3 opacity-80">Board-certified team, modern diagnostics, and patient-first attention.</p>
        </article>
        <article className="rounded-2xl border border-white/15 bg-white/5 p-7">
          <p className="text-xs uppercase tracking-[0.2em] opacity-80">Services</p>
          <ul className="mt-3 space-y-2 opacity-85">
            <li>General consultation</li>
            <li>Preventive screening</li>
            <li>Personalized treatment plans</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Appointment</p>
          <h3 className="mt-3 text-2xl font-semibold">Book In 30 Seconds</h3>
          <button className="mt-5 rounded-xl bg-white px-4 py-2 font-semibold text-black transition hover:scale-105">
            Book Appointment
          </button>
        </article>
      </div>
    </section>
  );
}

export function HealthcareAboutSection({ theme }: SharedProps) {
  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16`}>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        <SmartMedia industry="healthcare" section="hero" alt="Clinic environment" className="h-80" />
        <article className="rounded-2xl border border-white/15 bg-white/5 p-7">
          <p className="text-xs uppercase tracking-[0.2em] opacity-80">About</p>
          <h3 className="mt-3 text-3xl font-semibold">Compassionate, evidence-based care</h3>
          <p className="mt-3 opacity-80">Our doctors combine clinical expertise with patient-first communication.</p>
        </article>
      </div>
    </section>
  );
}

export function HealthcareServicesSection({ theme }: SharedProps) {
  const services = ["General medicine", "Diagnostics", "Preventive care", "Follow-up support"];
  return (
    <section className={`${theme.bg} ${theme.text} px-6 pb-16`}>
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-5 text-2xl font-semibold">Treatments & Services</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service} className="rounded-xl border border-white/15 bg-white/5 p-5">
              <p>{service}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HealthcareAppointmentSection({ theme }: SharedProps) {
  return (
    <section className={`${theme.bg} ${theme.text} px-6 pb-16`}>
      <div className="mx-auto max-w-6xl rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-8">
        <h3 className="text-2xl font-semibold">Book your appointment</h3>
        <p className="mt-2 opacity-80">Fast scheduling with immediate confirmation.</p>
        <button className="mt-5 rounded-xl bg-white px-5 py-2 font-semibold text-black transition hover:scale-105">Book Appointment</button>
      </div>
    </section>
  );
}

export function FinanceOrgans({ theme }: SharedProps) {
  const rows = [
    ["Verified Performance", "+42% portfolio growth"],
    ["Assets Under Analysis", "$120M"],
    ["Client Retention", "91% annual"],
  ];

  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16 md:py-24`}>
      <div className="mx-auto max-w-6xl space-y-6 rounded-2xl border border-amber-400/25 bg-amber-500/5 p-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Data-Led Credibility</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {rows.map((row) => (
            <article key={row[0]} className="rounded-xl border border-white/15 bg-black/20 p-5">
              <p className="text-sm opacity-70">{row[0]}</p>
              <p className="mt-2 text-xl font-semibold">{row[1]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinanceServicesSection({ theme }: SharedProps) {
  const services = ["Portfolio strategy", "Risk balancing", "Tax-aware planning", "Retirement roadmap"];

  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16`}>
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-5 text-2xl font-semibold">Financial Services</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service} className="rounded-xl border border-white/15 bg-white/5 p-5">
              {service}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinanceCaseStudiesSection({ theme }: SharedProps) {
  const studies = [
    "Growth-oriented portfolio gained 40% in 24 months",
    "Retirement portfolio reduced volatility by 28%",
  ];

  return (
    <section className={`${theme.bg} ${theme.text} px-6 pb-16`}>
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-5 text-2xl font-semibold">Case Studies</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {studies.map((study) => (
            <article key={study} className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-5">
              {study}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SaasOrgans({ theme }: SharedProps) {
  const steps = ["Connect your data", "Automate workflows", "Track growth in one dashboard"];

  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16 md:py-24`}>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-white/15 bg-white/5 p-8">
          <h2 className="text-3xl font-semibold">How It Works</h2>
          <ol className="mt-5 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </article>
        <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
          <SmartMedia industry="saas" section="hero" alt="SaaS dashboard preview" className="h-80" />
          <p className="mt-3 text-sm opacity-75">Live demo preview</p>
        </article>
      </div>
    </section>
  );
}

export function SaasFeaturesSection({ theme }: SharedProps) {
  const features = ["Automation engine", "Live dashboards", "Team collaboration", "Workflow alerts"];
  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16`}>
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-5 text-2xl font-semibold">Feature Grid</h3>
        <div className="grid gap-4 md:grid-cols-4">
          {features.map((feature) => (
            <article key={feature} className="rounded-xl border border-white/15 bg-white/5 p-5 text-sm">
              {feature}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SaasHowItWorksSection({ theme }: SharedProps) {
  return <SaasOrgans theme={theme} />;
}

export function SaasDemoPreviewSection({ theme }: SharedProps) {
  return (
    <section className={`${theme.bg} ${theme.text} px-6 pb-16`}>
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/15 bg-white/5 p-4">
        <SmartMedia industry="saas" section="gallery" alt="Product demo" className="h-96" />
        <p className="mt-3 text-sm opacity-75">Interactive product demo preview</p>
      </div>
    </section>
  );
}

export function RestaurantOrgans({ theme }: SharedProps) {
  const dishes = ["Truffle Pasta", "Woodfire Pizza", "Citrus Tart"];

  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16 md:py-24`}>
      <div className="mx-auto max-w-6xl space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Popular Dishes</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {dishes.map((dish) => (
            <article key={dish} className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <SmartMedia industry="restaurant" section="gallery" alt={`${dish} dish`} className="h-52" />
              <div className="mt-3 flex items-center justify-between">
                <h3 className="text-lg font-medium">{dish}</h3>
                <p className="font-semibold">$24</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RestaurantMenuSection({ theme }: SharedProps) {
  const menu = ["Chef's Tasting Menu - $69", "Signature Bowls - $22", "Seasonal Desserts - $14"];
  return (
    <section className={`${theme.bg} ${theme.text} px-6 py-16`}>
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/15 bg-white/5 p-8">
        <h3 className="mb-4 text-2xl font-semibold">Menu Highlights</h3>
        <ul className="space-y-3">
          {menu.map((item) => (
            <li key={item} className="flex items-center justify-between border-b border-white/10 pb-2">
              <span>{item.split(" - ")[0]}</span>
              <span className="font-semibold">{item.split(" - ")[1]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RestaurantPopularDishesSection({ theme }: SharedProps) {
  return <RestaurantOrgans theme={theme} />;
}

export function RestaurantGallerySection({ theme }: SharedProps) {
  return (
    <section className={`${theme.bg} ${theme.text} px-6 pb-16`}>
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-5 text-2xl font-semibold">Ambience Gallery</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <SmartMedia industry="restaurant" section="gallery" alt="Dining ambience" className="h-52" />
          <SmartMedia industry="restaurant" section="team" alt="Restaurant team" className="h-52" />
          <SmartMedia industry="restaurant" section="creative" alt="Restaurant creative" className="h-52" />
        </div>
      </div>
    </section>
  );
}

export function KeywordsCloudSection({
  theme,
  keywords,
}: SharedProps & { keywords: string[] }) {
  if (!keywords || keywords.length === 0) return null;

  return (
    <section className={`${theme.bg} ${theme.text} px-6 pb-16`}>
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-5 text-2xl font-semibold">Keyword Intent Cluster</h3>
        <div className="flex flex-wrap gap-3">
          {keywords.slice(0, 10).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
