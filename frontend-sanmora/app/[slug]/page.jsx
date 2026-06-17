import React from "react";
import { notFound } from "next/navigation";
import { seoPagesData } from "@/data/seoPagesData";
import SeoLandingClient from "@/components/Services/SeoLandingClient";

// 1. Pre-generate static paths at build time for optimal Core Web Vitals speed.
export async function generateStaticParams() {
  return seoPagesData.map((page) => ({
    slug: page.slug,
  }));
}

// 2. Generate customized metadata for search engine indexing.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pageData = seoPagesData.find((p) => p.slug === slug);

  if (!pageData) {
    return {};
  }

  return {
    title: pageData.title,
    description: pageData.metaDescription,
    openGraph: {
      title: pageData.title,
      description: pageData.metaDescription,
    },
  };
}

// 3. Render the SEO Landing Page or call notFound() for invalid slugs.
export default async function SeoLandingPage({ params }) {
  const { slug } = await params;
  const pageData = seoPagesData.find((p) => p.slug === slug);

  if (!pageData) {
    notFound();
  }

  return <SeoLandingClient pageData={pageData} />;
}
