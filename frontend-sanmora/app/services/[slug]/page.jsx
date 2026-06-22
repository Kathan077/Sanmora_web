import React from "react";
import SubServiceClient from "@/components/Services/SubServiceClient";
import { servicesData } from "@/components/Navbar/servicesData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((item) => item.slug === slug);
  return {
    title: `${service?.name ?? "Service"} | Sanmora Technologies`,
    description: service?.description ?? "Explore Sanmora Technologies' premium design and engineering services.",
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  
  const service = servicesData.find((item) => item.slug === slug);

  return (
    <SubServiceClient 
      service={service} 
    />
  );
}
