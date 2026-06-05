"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/services/services.module.css";

export default function ServiceVisual({
  src,
  alt,
  priority = false,
  badge,
}) {
  return (
    <div className={styles.serviceVisualBox}>
      <div className={styles.serviceImageCard}>
        {badge && <span className={styles.serviceImageBadge}>{badge}</span>}
        <Image
          src={src}
          alt={alt}
          width={440}
          height={320}
          className={styles.serviceImage}
          priority={priority}
          unoptimized
          sizes="(max-width: 768px) 100vw, 440px"
        />
      </div>
    </div>
  );
}
