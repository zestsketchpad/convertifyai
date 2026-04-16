"use client";

import { useCallback, useState } from "react";
import { globalStyles, INITIAL_REVIEWS, type Review } from "./config";
import { Toast } from "./ui";
import Analytics from "./sections/Analytics";
import CTA from "./sections/CTA";
import Features from "./sections/Features";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Animationtwo from "./sections/Animationtwo";
import Navbar from "./sections/Navbar";
import Pricing from "./sections/Pricing";
import ReviewsSection from "./sections/ReviewsSection";
import Testimonials from "./sections/Testimonials";

export default function ConvertifyAIPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => setToast(msg), []);
  const closeToast = useCallback(() => setToast(null), []);

  return (
    <>
      <style>{globalStyles}</style>
      {toast && <Toast message={toast} onClose={closeToast} />}
      <Navbar />
      <Hero />
      <Animationtwo />
      <Features onToast={showToast} />
      <HowItWorks />
      <ReviewsSection reviews={reviews} onReviewsChange={setReviews} onToast={showToast} />

      <Analytics onToast={showToast} />
      <Pricing onToast={showToast} />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
