"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function InstagramProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger on route changes
  useEffect(() => {
    setLoading(true);
    setProgress(20);

    const timer1 = setTimeout(() => setProgress(75), 120);
    const timer2 = setTimeout(() => setProgress(100), 280);
    const timer3 = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname, searchParams]);

  if (!loading && progress === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 999999,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "rgba(124, 58, 237, 0.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 90%, #7c3aed 100%)",
          boxShadow: "0 0 10px rgba(220, 39, 67, 0.7), 0 0 20px rgba(188, 24, 136, 0.4)",
          transition: progress === 100 ? "width 0.15s ease-out, opacity 0.2s ease" : "width 0.25s cubic-bezier(0.1, 0.8, 0.2, 1)",
          opacity: progress === 100 ? 0 : 1,
          willChange: "width, opacity",
        }}
      />
    </div>
  );
}

