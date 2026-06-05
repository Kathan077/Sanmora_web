import React from "react";
import SubServiceClient from "@/components/Services/SubServiceClient";
import { servicesData } from "@/components/Navbar/servicesData";

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  
  const service = servicesData.find((item) => item.slug === slug);

  return (
    <SubServiceClient 
      service={service} 
    />
  );
}
