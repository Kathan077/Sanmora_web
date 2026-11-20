"use client";

import React, { memo } from "react";
import styles from "./InstagramSkeleton.module.css";

export const SkeletonBox = memo(function SkeletonBox({ width, height, borderRadius, className = "", style = {} }) {
  return (
    <div
      className={`${styles.skeletonBase} ${className}`}
      style={{
        width: width || "100%",
        height: height || "100%",
        borderRadius: borderRadius || "12px",
        ...style,
      }}
    >
      <div className={styles.shimmerOverlay} />
    </div>
  );
});

export const HomeAboutSkeleton = memo(function HomeAboutSkeleton() {
  return (
    <section className={styles.sectionWrapper} style={{ minHeight: "650px", justifyContent: "center" }}>
      <SkeletonBox height="620px" borderRadius="24px" className={styles.aboutSkeleton} />
    </section>
  );
});

export const ServicesSkeleton = memo(function ServicesSkeleton() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerSkeleton}>
        <SkeletonBox width="140px" height="30px" borderRadius="50px" />
        <SkeletonBox width="420px" height="44px" />
        <SkeletonBox width="560px" height="22px" />
      </div>
      <div className={styles.grid3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonBox key={i} height="280px" borderRadius="20px" className={styles.cardSkeleton} />
        ))}
      </div>
    </section>
  );
});

export const ProcessSkeleton = memo(function ProcessSkeleton() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerSkeleton}>
        <SkeletonBox width="130px" height="28px" borderRadius="50px" />
        <SkeletonBox width="380px" height="42px" />
      </div>
      <div className={styles.grid4}>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBox key={i} height="240px" borderRadius="18px" />
        ))}
      </div>
    </section>
  );
});

export const WorkflowSkeleton = memo(function WorkflowSkeleton() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerSkeleton}>
        <SkeletonBox width="120px" height="28px" borderRadius="50px" />
        <SkeletonBox width="350px" height="42px" />
      </div>
      <SkeletonBox height="400px" borderRadius="24px" />
    </section>
  );
});

export const GrowthSkeleton = memo(function GrowthSkeleton() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerSkeleton}>
        <SkeletonBox width="140px" height="30px" borderRadius="50px" />
        <SkeletonBox width="440px" height="44px" />
      </div>
      <div className={styles.grid3}>
        {[1, 2, 3].map((i) => (
          <SkeletonBox key={i} height="260px" borderRadius="20px" />
        ))}
      </div>
    </section>
  );
});

export const SolutionsSkeleton = memo(function SolutionsSkeleton() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerSkeleton}>
        <SkeletonBox width="130px" height="28px" borderRadius="50px" />
        <SkeletonBox width="400px" height="42px" />
      </div>
      <div className={styles.grid3}>
        {[1, 2, 3].map((i) => (
          <SkeletonBox key={i} height="320px" borderRadius="22px" />
        ))}
      </div>
    </section>
  );
});

export const TechSkeleton = memo(function TechSkeleton() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerSkeleton}>
        <SkeletonBox width="360px" height="40px" />
      </div>
      <SkeletonBox height="220px" borderRadius="20px" />
    </section>
  );
});

