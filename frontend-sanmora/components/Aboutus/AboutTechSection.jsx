"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import styles from './AboutTechSection.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TECH_ICONS = {
  html: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#E34F26" d="M1.5 1.5h21l-1.9 21-8.6 2.4-8.6-2.4L1.5 1.5z" />
      <path fill="#F06529" d="M12 3.7v18L18.5 20l1.6-13.6H12z" />
      <path fill="#EFEFEF" d="M12 9.1H8.4l.2 2.5H12V9.1zm0 4.9H9l.2 2.4 2.8.8V14z" />
      <path fill="#FFFFFF" d="M12 9.1h3.6l-.3 3.5H12v-3.5zm0 4.9h2.7l-.3 3.2-2.4.8V14z" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#1572B6" d="M1.5 1.5h21l-1.9 21-8.6 2.4-8.6-2.4L1.5 1.5z" />
      <path fill="#33A9DC" d="M12 3.7v18L18.5 20l1.6-13.6H12z" />
      <path fill="#EFEFEF" d="M12 9.1H8.4l.2 2.5H12V9.1zm0 4.9H9l.2 2.4 2.8.8V14z" />
      <path fill="#FFFFFF" d="M12 6.6h5.8l-.2 2.5H12v-2.5zm0 5h3.3l-.3 3.5-3 1V11.6z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#38BDF8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#F7DF1E" d="M0 0h24v24H0z" />
      <path fill="#000000" d="M20.2 17.6c-.3-.8-.9-1.2-1.8-1.2-.8 0-1.3.4-1.3 1 0 1 .8 1.2 1.9 1.7 1.5.6 2.4 1.2 2.4 2.8 0 1.6-1.2 2.8-3.1 2.8-1.9 0-2.9-1-3.3-2.1l1.5-.9c.3.6.8 1 1.7 1 .8 0 1.2-.4 1.2-.9 0-.6-.5-.9-1.4-1.2-1.6-.6-2.9-1.2-2.9-2.9 0-1.5 1.1-2.6 2.9-2.6 1.6 0 2.6.8 3.1 1.9l-1.5.9z" />
    </svg>
  ),
  jquery: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#0769AD" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 15.6c-.6 0-1.2-.2-1.7-.7l-3.3-3.3 1.4-1.4 2.6 2.6 4.7-4.7 1.4 1.4-6.1 6.1z" />
    </svg>
  ),
  laravel: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#FF2D20" d="M8.354 20.354l-5.63-5.63c-.47-.47-.47-1.23 0-1.7l1.41-1.41 7.33 7.33-1.41 1.41c-.47.47-1.23.47-1.7 0zm10-10l-5.63-5.63c-.47-.47-1.23-.47-1.7 0L9.614 6.134l7.33 7.33 1.41-1.41c.47-.47.47-1.23 0-1.7zM12.5 1.5h8v8h-8z" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#3776AB" d="M12 2c-3.1 0-2.9 1.3-2.9 1.3V5h3v.3H7.5S4.5 5.5 4.5 9c0 3.5 2.6 3.3 2.6 3.3h1.6V11c0-1.5 1.3-2.7 2.8-2.7h4c1.5 0 2.5-1 2.5-2.5V4.2c0-1.5-1.5-2.2-6-2.2zm-2.8 1.4c.4 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.4-.8.8-.8z" />
      <path fill="#FFD43B" d="M12 22c3.1 0 2.9-1.3 2.9-1.3V19h-3v-.3h4.6s3-.2 3-3.7c0-3.5-2.6-3.3-2.6-3.3h-1.6V13c0 1.5-1.3 2.7-2.8 2.7h-4c-1.5 0-2.5 1-2.5 2.5v1.6c0 1.5 1.5 2.2 6 2.2zm2.8-1.4c-.4 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.4.8-.8.8z" />
    </svg>
  ),
  rails: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#CC0000" d="M12 2L2 9l10 13 10-13L12 2zm0 3.2L18.4 9H5.6L12 5.2zM4.7 10.5h14.6L12 19.9l-7.3-9.4z" />
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#4169E1" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5c-.8.8-2.1.8-2.9 0L12 13.9l-1.6 1.6c-.8.8-2.1.8-2.9 0s-.8-2.1 0-2.9L9.1 11 7.5 9.4c-.8-.8-.8-2.1 0-2.9s2.1-.8 2.9 0L12 8.1l1.6-1.6c.8-.8 2.1-.8 2.9 0s.8 2.1 0 2.9L14.9 11l1.6 1.6c.8.8.8 2.1 0 2.9z" />
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#47A248" d="M12 2C9.5 5.5 8 9 8 12c0 2.5 1.5 5 4 8 2.5-3 4-5.5 4-8 0-3-1.5-6.5-4-10zm0 14c-1.3-.8-2-2-2-4 0-1.8 1-4.2 2-6.5 1 2.3 2 4.7 2 6.5 0 2-.7 3.2-2 4z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#61DAFB" d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#3178C6" d="M0 0h24v24H0z" />
      <path fill="#FFFFFF" d="M20 18h-4v-1.8h1.8v-7.4H16V7h4v11zm-6-9.2H9.5v9.2H7.7V8.8H6V7h8v1.8z" />
    </svg>
  ),
  googlecloud: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#4285F4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  ),
  kubernetes: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#326CE5" d="M12 2L2.5 5.5v13L12 22l9.5-3.5v-13L12 2zm0 3.2L18.4 9H5.6L12 5.2zM4.7 10.5h14.6L12 19.9l-7.3-9.4z" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg}>
      <path fill="#2496ED" d="M13.983 8.871h-1.996v1.996h1.996V8.871zM11.486 8.871H9.49v1.996h1.996V8.871zM8.99 8.871H6.994v1.996H8.99V8.871zM6.494 8.871H4.498v1.996h1.996V8.871zM13.983 6.375h-1.996v1.996h1.996V6.375zM11.486 6.375H9.49v1.996h1.996V6.375zM8.99 6.375H6.994v1.996H8.99V6.375zM13.983 3.878h-1.996v1.996h1.996V3.878zM23.99 12.3c-.482-.315-1.185-.245-1.702-.245h-.224c-.161-1.926-1.589-3.415-3.415-3.415-.224 0-.441.021-.658.063-.56-1.282-1.841-2.184-3.324-2.184-.112 0-.224.007-.336.021V8.871h.014c.098 0 .182.077.182.182v1.996h2.247c.392 0 .707.315.707.707v.245c0 2.219-1.794 4.013-4.013 4.013h-6.99V7.954h.014c.098 0 .182.077.182.182V10.13h2.247c.392 0 .707.315.707.707v.245c0 1.289-.609 2.438-1.555 3.178h8.558c2.956 0 5.438-2.228 5.753-5.112.56.077 1.106.126 1.632-.126.686-.336.966-.994.889-1.925z" />
    </svg>
  )
};

const categories = [
  {
    title: "Frontend Foundations",
    techs: [
      { name: "HTML", iconKey: "html" },
      { name: "CSS/Sass", iconKey: "css" },
      { name: "Tailwind", iconKey: "tailwind" },
      { name: "JavaScript", iconKey: "javascript" },
      { name: "jQuery", iconKey: "jquery" }
    ]
  },
  {
    title: "Backend & Databases",
    techs: [
      { name: "Laravel", iconKey: "laravel" },
      { name: "Python/Django", iconKey: "python" },
      { name: "Ruby on Rails", iconKey: "rails" },
      { name: "PostgreSQL", iconKey: "postgresql" },
      { name: "MongoDB", iconKey: "mongodb" }
    ]
  },
  {
    title: "Modern Scale & Cloud",
    techs: [
      { name: "React/Next.js", iconKey: "react" },
      { name: "TypeScript", iconKey: "typescript" },
      { name: "Google Cloud", iconKey: "googlecloud" },
      { name: "Kubernetes", iconKey: "kubernetes" },
      { name: "Docker", iconKey: "docker" }
    ]
  }
];

export default function InteractiveTechDrop() {
  const containerRef = useRef(null);
  const playgroundRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const hasDroppedRef = useRef(false);

  // GSAP Entrance Animations for Category Grid
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal left side heading and text (Section 1)
      gsap.fromTo(".reveal-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Sequential fade-in slide animation for the columns (Section 1)
      gsap.fromTo(".reveal-column",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Fix smooth scrolling conflict with GSAP pinning globally while component is active
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const htmlEl = document.documentElement;
      const originalScrollBehavior = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = 'auto'; // Disable smooth scroll to prevent pinning stutter/lockups

      return () => {
        htmlEl.style.scrollBehavior = originalScrollBehavior;
      };
    }
  }, []);

  // Matter.js Physics Simulator
  useEffect(() => {
    if (!canvasWrapperRef.current) return;

    let isMounted = true;
    let engine, render, runner, mouseConstraint, st;
    let explicitBodies = { floor: null, leftWall: null, rightWall: null, ceiling: null };
    let pills = [];
    let handleResizeFn = null;
    let MatterLib = null;

    // Custom technologies matching screenshot request
    const playgroundTechs = [
      "Apollo", "MongoDB", "Stripe", "Git", "Sass", "Rust",
      "MERN", "Redux", "Three.js", "Babel", "TypeScript",
      "Headless", "WebAssembly", "C#", "GA4/GTM", "Django",
      "React", "Tailwind", "Next.js", "Docker"
    ];

    let width = canvasWrapperRef.current.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);
    let height = canvasWrapperRef.current.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 600);

    import('matter-js').then((Matter) => {
      if (!isMounted) return;
      MatterLib = Matter;

      const { Engine, Render, Runner, MouseConstraint, Mouse, World, Bodies, Body, Events } = Matter;

      engine = Engine.create();
      const world = engine.world;

      // Renderer optimized for Apple light-mode theme (with a transparent background)
      // Force pixelRatio to 1 to match physics calculations precisely and avoid cursor offset issues
      render = Render.create({
        element: canvasWrapperRef.current,
        engine: engine,
        options: {
          width,
          height,
          wireframes: false,
          background: 'transparent',
          pixelRatio: 1
        }
      });

      Render.run(render);

      runner = Runner.create();
      Runner.run(runner, engine);

      // Create Invisible boundaries inside the card container (Thick 2000px walls prevent escape/glitching)
      const wallOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
      const wallThickness = 2000;
      explicitBodies.floor = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions);
      explicitBodies.leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 4, wallOptions);
      explicitBodies.rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 4, wallOptions);
      explicitBodies.ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, wallOptions);

      World.add(world, [explicitBodies.floor, explicitBodies.leftWall, explicitBodies.rightWall, explicitBodies.ceiling]);

      // Accurate Mouse drag controls
      const mouse = Mouse.create(render.canvas);
      // Force mouse pixelRatio to 1 to perfectly align with physics coordinates
      mouse.pixelRatio = 1;

      // Clamp mouse coordinates to bounds inside the tick loop to prevent extreme boundary drag glitching
      Events.on(engine, 'beforeUpdate', () => {
        if (!mouse) return;
        if (mouse.position.x < 0) mouse.position.x = 0;
        if (mouse.position.x > width) mouse.position.x = width;
        if (mouse.position.y < 0) mouse.position.y = 0;
        if (mouse.position.y > height) mouse.position.y = height;
      });

      // Create and add MouseConstraint so users can drag and toss the pills (stiffness 0.85 for responsive crisp tracking)
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.85,
          render: { visible: false }
        }
      });
      World.add(world, mouseConstraint);
      render.mouse = mouse;

      // Prevent Matter.js from hijacking scroll wheel events by capturing and stopping them
      // before they reach Matter's internal event listeners.
      const preventHijack = (e) => {
        e.stopImmediatePropagation();
      };

      if (render.canvas) {
        render.canvas.addEventListener("wheel", preventHijack, { capture: true });
        render.canvas.addEventListener("mousewheel", preventHijack, { capture: true });
        render.canvas.addEventListener("DOMMouseScroll", preventHijack, { capture: true });
      }

      // Clean up touch listeners from the canvas element to prevent scroll hijacking on touch
      if (mouse.element) {
        mouse.element.removeEventListener("touchstart", mouse.mousedown);
        mouse.element.removeEventListener("touchmove", mouse.mousemove);
        mouse.element.removeEventListener("touchend", mouse.mouseup);
      }

      // Pill metrics calculations
      const isMobile = width < 768;
      const pillHeight = isMobile ? 30 : 44;
      const pillWidths = playgroundTechs.map(tech => Math.max(isMobile ? 65 : 100, tech.length * (isMobile ? 8 : 11) + (isMobile ? 20 : 35)));

      // Trigger the physics drop animation
      const dropPills = () => {
        if (!isMounted || pills.length > 0) return;

        pills = playgroundTechs.map((tech, i) => {
          const w = pillWidths[i];
          const minPillWidth = isMobile ? 65 : 100;
          const startX = Math.random() * (width - minPillWidth * 2) + minPillWidth;
          const startY = -(Math.random() * 300) - 50;

          return Bodies.rectangle(startX, startY, w, pillHeight, {
            chamfer: { radius: pillHeight / 2 },
            restitution: 0.55,
            friction: 0.05,
            density: 0.005,
            render: { visible: false } // Custom rendered on afterRender
          });
        });

        World.add(world, pills);
      };

      // Custom high-fidelity drawing layer (Rounded corners, soft borders, clean fonts, drop shadows)
      Events.on(render, 'afterRender', () => {
        const ctx = render.context;
        if (!ctx) return;

        pills.forEach((pill, i) => {
          const { x, y } = pill.position;
          const techName = playgroundTechs[i];
          const w = pillWidths[i];

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(pill.angle);

          // Render soft Apple drop shadow
          ctx.shadowColor = 'rgba(124, 58, 237, 0.05)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 4;

          // Draw Pill Base Shape
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-w / 2, -pillHeight / 2, w, pillHeight, pillHeight / 2);
          } else {
            ctx.arc(-w / 2 + pillHeight / 2, 0, pillHeight / 2, Math.PI / 2, 3 * Math.PI / 2);
            ctx.lineTo(w / 2 - pillHeight / 2, -pillHeight / 2);
            ctx.arc(w / 2 - pillHeight / 2, 0, pillHeight / 2, 3 * Math.PI / 2, Math.PI / 2);
            ctx.closePath();
          }
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // Reset shadows for borders/text
          ctx.shadowColor = 'transparent';
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
          ctx.stroke();

          // Render Text Centered
          ctx.font = `600 ${isMobile ? '10px' : '13px'} -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(techName, 0, 0);

          ctx.restore();
        });
      });

      // Handle Canvas sizing responsively
      const handleResize = () => {
        if (!canvasWrapperRef.current) return;
        width = canvasWrapperRef.current.clientWidth || window.innerWidth;
        height = canvasWrapperRef.current.clientHeight || window.innerHeight;

        render.canvas.width = width;
        render.canvas.height = height;
        render.options.width = width;
        render.options.height = height;

        const wallThick = 2000;
        Body.setPosition(explicitBodies.floor, { x: width / 2, y: height + wallThick / 2 });
        Body.setPosition(explicitBodies.leftWall, { x: -wallThick / 2, y: height / 2 });
        Body.setPosition(explicitBodies.rightWall, { x: width + wallThick / 2, y: height / 2 });
        Body.setPosition(explicitBodies.ceiling, { x: width / 2, y: -wallThick / 2 });
      };
      handleResizeFn = handleResize;

      // Run resize calculation immediately on render start to align all initial coordinate systems
      handleResize();

      // Secondary check after layout settles to prevent potential startup size mismatches
      setTimeout(() => {
        handleResize();
      }, 50);

      window.addEventListener('resize', handleResize);

      // GSAP ScrollTrigger to PIN the full screen playground (Static Scroll)
      // Restrict pinning to screen sizes larger than 1024px to ensure smooth scroll on tablets
      const pinScreen = typeof window !== 'undefined' && window.innerWidth > 1024;
      const startTrigger = pinScreen ? "top top" : "top 80%";

      st = ScrollTrigger.create({
        trigger: playgroundRef.current,
        start: startTrigger,
        end: pinScreen ? "+=10%" : "+=10%",
        pin: pinScreen,
        pinSpacing: pinScreen,
        anticipatePin: 1, // Smooth out entrance pin jitter
        onEnter: () => {
          if (!hasDroppedRef.current) {
            dropPills();
            hasDroppedRef.current = true;
          }
        },
        onUpdate: (self) => {
          // Backup check: drop the pills if the scroll progress is active and they haven't dropped yet
          if (self.progress > 0 && !hasDroppedRef.current) {
            dropPills();
            hasDroppedRef.current = true;
          }
        }
      });

      // Trigger a ScrollTrigger refresh after initial DOM settles
      ScrollTrigger.refresh();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });

    return () => {
      isMounted = false;
      if (handleResizeFn) {
        window.removeEventListener('resize', handleResizeFn);
      }
      if (st) {
        st.kill();
      }
      if (render) {
        Render.stop(render);
        if (render.canvas) {
          render.canvas.remove();
        }
      }
      if (runner) {
        Runner.stop(runner);
      }
      if (MatterLib && engine && world) {
        MatterLib.World.clear(world);
        MatterLib.Engine.clear(engine);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {/* SECTION 1: 3-Column Technology Categories (Static Grid) */}
      <section className={styles.gridSection}>
        <div className={styles.gridContainer}>
          <div className={styles.leftCol}>
            <h2 className={`${styles.title} reveal-text`}>
              OUR<br />TECHNOLOGIES
            </h2>
            <p className={`${styles.description} reveal-text`}>
              Every project begins with a vision, and we make it uniquely yours with a personalized approach at every step. We focus on what truly matters, blending creativity with smart strategy and paying attention to every detail to achieve perfection.
            </p>
          </div>

          <div className={styles.rightCol}>
            {categories.map((category, index) => (
              <div
                key={category.title}
                className={`${styles.columnCard} reveal-column`}
              >
                <ul className={styles.techList}>
                  {category.techs.map((tech) => (
                    <li key={tech.name} className={styles.techItem}>
                      <div className={styles.iconContainer}>
                        {TECH_ICONS[tech.iconKey]}
                      </div>
                      <span className={styles.techName}>{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Borderless, Textless Full-Screen Physics Playground */}
      <section className={styles.playgroundSection} ref={playgroundRef}>
        <div ref={canvasWrapperRef} className={styles.canvasWrapper}>
          {/* Matter.js canvas renders here */}
        </div>
      </section>
    </div>
  );
}