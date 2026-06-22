import React from "react";
import ServicesPageClient from "@/components/Services/ServicesPageClient";

export const metadata = {
  title: "Our Services | Sanmora Technologies",
  description: "Explore Sanmora Technologies' premium visual design, custom software engineering, and technical SEO scaling systems.",
  openGraph: {
    title: "Our Services | Sanmora Technologies",
    description: "Explore Sanmora Technologies' premium visual design, custom software engineering, and technical SEO scaling systems.",
  }
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}