import { notFound } from "next/navigation";
import CaseStudyDetailClient from "@/components/CaseStudies/CaseStudyDetailClient";
import { caseStudiesData } from "@/components/CaseStudies/caseStudiesData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = caseStudiesData.find((cs) => cs.slug === slug);
  if (!caseStudy) return { title: "Case Study Not Found" };

  return {
    title: `${caseStudy.title} | Sanmora Studio`,
    description: caseStudy.summary,
  };
}

export async function generateStaticParams() {
  return caseStudiesData.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = caseStudiesData.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
