import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ConsultationClient from "@/components/Consultation/ConsultationClient";
import { Suspense } from "react";

export const metadata = {
  title: "Get a Free Consultation - Sanmora Technologies",
  description: "Request a free consultation with the experts at Sanmora Technologies.",
};

export default function ConsultationPage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div>Loading form...</div>}>
        <ConsultationClient />
      </Suspense>
      <Footer />
    </main>
  );
}
