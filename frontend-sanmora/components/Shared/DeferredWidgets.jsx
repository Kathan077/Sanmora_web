"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const VoiceAssistant = dynamic(() => import("@/components/Shared/VoiceAssistant"), {
  ssr: false,
});

const Chatbot = dynamic(() => import("@/components/Shared/Chatbot/Chatbot"), {
  ssr: false,
});

export default function DeferredWidgets() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Load widgets after initial idle or on user interaction (scroll/click/touchstart)
    const onUserInteraction = () => {
      setShouldLoad(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("mousemove", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
    };

    // Idle timer fallback
    let idleTimer;
    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(() => setShouldLoad(true), { timeout: 2500 });
      idleTimer = () => window.cancelIdleCallback(handle);
    } else {
      const handle = setTimeout(() => setShouldLoad(true), 2000);
      idleTimer = () => clearTimeout(handle);
    }

    window.addEventListener("scroll", onUserInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", onUserInteraction, { passive: true, once: true });

    return () => {
      cleanup();
      if (idleTimer) idleTimer();
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <VoiceAssistant />
      <Chatbot />
    </>
  );
}

