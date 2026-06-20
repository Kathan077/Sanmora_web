import React from "react";
import { servicesData } from "@/components/Navbar/servicesData";
import CategoryDetailClient from "@/components/Services/CategoryDetailClient";

export async function generateMetadata({ params }) {
  const { slug, category } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  const cat = service?.categories?.find((c) => c.slug === category);
  return {
    title: `${cat?.name ?? "Category"} | ${service?.name ?? "Services"} | Sanmora Technologies`,
    description: cat?.longDescription ?? cat?.description ?? service?.description,
  };
}

export default async function CategoryDetailPage({ params }) {
  const { slug, category } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  const cat = service?.categories?.find((c) => c.slug === category);

  return (
    <CategoryDetailClient
      service={service}
      category={cat}
    />
  );
}
