"use client";

import React from "react";
import styles from "./AboutHero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Grid */}
      <div className={styles.grid}></div>

      {/* Main Hero */}
      <div className={styles.heroContainer}>
        {/* Left Content */}
        <div className={styles.content}>


          <h1 className={styles.title}>
            We Define
            <br />
            <span className={styles.gradient}>the Standard.</span>
            <br />
            Systems Built
            <br />
            <span className={styles.gradient}>to Scale.</span>
          </h1>

          <p className={styles.description}>
            No empty promises. Sanmora builds high-performance, scalable software that works on day one and flawlessly scales with your business growth.
          </p>



          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.iconCircle}>$</div>
              <h3>₹40M+</h3>
              <span>Total Funding</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.stat}>
              <div className={styles.iconCircle}>👥</div>
              <h3>500k+</h3>
              <span>Active Users</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.stat}>
              <div className={styles.iconCircle}>⚑</div>
              <h3>2026</h3>
              <span>Founded</span>
            </div>
          </div>
        </div>

        {/* Right Globe */}
        <div className={styles.visual}>
          <div className={styles.glow}></div>

          <img
            src="/images/globe.png"
            alt="Global Network"
            className={styles.globe}
          />
        </div>
      </div>


    </section>
  );
}