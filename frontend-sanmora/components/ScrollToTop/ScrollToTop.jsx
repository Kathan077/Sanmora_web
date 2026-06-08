"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // If navigating to a specific section/hash, let the browser/Next.js handle it
    if (window.location.hash) {
      return;
    }

    // Scroll to the top of the document instantly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
