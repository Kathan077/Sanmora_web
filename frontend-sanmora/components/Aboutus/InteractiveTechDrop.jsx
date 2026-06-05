"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Matter from 'matter-js';
import styles from './InteractiveTechDrop.module.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const technologies = [
  "React/Next.js", "TypeScript", "Tailwind", "Node.js", 
  "Python/Django", "PostgreSQL", "MongoDB", "Kubernetes",
  "Google Cloud", "Rust", "WebAssembly", "GraphQL", 
  "Redux", "Framer Motion", "Matter.js", "Three.js",
  "Elasticsearch", "Docker", "AWS", "Figma"
];

export default function InteractiveTechDrop() {
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const hasDroppedRef = useRef(false); // Use ref instead of state to prevent re-renders

  useEffect(() => {
    // Basic GSAP fade for text
    let ctx = gsap.context(() => {
      gsap.fromTo(".tech-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!canvasWrapperRef.current) return;

    // Use dynamic import for matter-js to avoid SSR issues completely
    import('matter-js').then((Matter) => {
      const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite;

      // Create engine
      const engine = Engine.create();
      const world = engine.world;
      
      // Get dimensions of the container safely
      let width = canvasWrapperRef.current.clientWidth || 800;
      let height = canvasWrapperRef.current.clientHeight || 800;

      // Create renderer
      const render = Render.create({
        element: canvasWrapperRef.current,
        engine: engine,
        options: {
          width,
          height,
          wireframes: false,
          background: 'transparent',
          pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
        }
      });

      Render.run(render);
      
      // Create runner
      const runner = Runner.create();
      Runner.run(runner, engine);

      // Add boundaries (walls and floor) - THICK walls prevent high-velocity tunneling
      const wallOptions = { 
        isStatic: true,
        render: { fillStyle: 'transparent' }
      };
      
      const floor = Bodies.rectangle(width / 2, height + 100, width * 2, 200, wallOptions);
      const leftWall = Bodies.rectangle(-100, 0, 200, height * 8, wallOptions);
      const rightWall = Bodies.rectangle(width + 100, 0, 200, height * 8, wallOptions);
      const ceiling = Bodies.rectangle(width / 2, -1000, width * 2, 200, wallOptions);

      World.add(world, [floor, leftWall, rightWall, ceiling]);

      // Add mouse control for interaction
      const mouse = Mouse.create(render.canvas);
      // CRITICAL FIX: Match mouse pixel ratio to render pixel ratio for High-DPI/Retina screens!
      mouse.pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.8, // Increased stiffness for better drag feel
          render: { visible: false }
        }
      });
      World.add(world, mouseConstraint);
      
      // Keep the mouse in sync with rendering
      render.mouse = mouse;

      // Prevent matter.js from hijacking page scroll
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      // Handle Resize
      const handleResize = () => {
        if (!canvasWrapperRef.current) return;
        width = canvasWrapperRef.current.clientWidth;
        height = canvasWrapperRef.current.clientHeight;
        
        render.canvas.width = width;
        render.canvas.height = height;
        render.options.width = width;
        render.options.height = height;
        
        // Update boundaries safely using explicit references
        Matter.Body.setPosition(floor, { x: width / 2, y: height + 100 });
        Matter.Body.setPosition(leftWall, { x: -100, y: height / 2 });
        Matter.Body.setPosition(rightWall, { x: width + 100, y: height / 2 });
        Matter.Body.setPosition(ceiling, { x: width / 2, y: -1000 });
      };
      
      window.addEventListener('resize', handleResize);

      // ScrollTrigger to drop pills
      const st = ScrollTrigger.create({
        trigger: canvasWrapperRef.current,
        start: "top 60%",
        onEnter: () => {
          if (!hasDroppedRef.current) {
            dropPills();
            hasDroppedRef.current = true;
          }
        }
      });

      const dropPills = () => {
        // Create pill bodies based on technologies
        const pills = technologies.map((tech, i) => {
          // Increase size for easier interaction and better visibility
          const pillWidth = Math.max(140, tech.length * 14);
          const pillHeight = 55;
          
          // Drop them from below the ceiling so they don't spawn out of bounds
          const startX = Math.random() * (width - 200) + 100;
          const startY = -(Math.random() * 500) - 100; 
          
          return Bodies.rectangle(startX, startY, pillWidth, pillHeight, {
            chamfer: { radius: pillHeight / 2 },
            restitution: 0.6, // Bounciness
            friction: 0.1,
            density: 0.005, // Slightly heavier for better physics feel
            render: {
              fillStyle: '#ffffff', // Light mode pill background
              strokeStyle: 'rgba(15, 23, 42, 0.1)',
              lineWidth: 1
            }
          });
        });
        
        World.add(world, pills);

        // Custom drawing for text on pills
        Matter.Events.on(render, 'afterRender', function() {
          const ctx = render.context;
          ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#0f172a'; // Dark text for light pills
          
          pills.forEach((pill, index) => {
            if (Composite.allBodies(world).includes(pill)) {
              const { x, y } = pill.position;
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(pill.angle);
              ctx.fillText(technologies[index], 0, 0);
              ctx.restore();
            }
          });
        });
      };

      // Expose cleanup method to the outer useEffect
      canvasWrapperRef.current._cleanupPhysics = () => {
        window.removeEventListener('resize', handleResize);
        st.kill();
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas) render.canvas.remove();
        World.clear(world);
        Engine.clear(engine);
      };
    });

    // Outer Cleanup
    return () => {
      if (canvasWrapperRef.current && canvasWrapperRef.current._cleanupPhysics) {
        canvasWrapperRef.current._cleanupPhysics();
      }
    };
  }, []); // Empty dependency array ensures it only runs once

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        
        {/* Full Width Interactive Physics Canvas */}
        <div className={styles.rightCol} ref={canvasWrapperRef}>
          {/* Matter.js canvas will be injected here */}
        </div>

      </div>
    </section>
  );
}
