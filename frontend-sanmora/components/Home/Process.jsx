"use client";
import React, { useState, useRef } from 'react';
import styles from './Process.module.css';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, List, Users, FileText, Settings, Target, CheckCircle, Rocket, Play, Monitor, Shield, TrendingUp, BarChart, Layout, Code, RefreshCw, Edit3, PenTool, Palette } from 'lucide-react';

const serviceData = {
    website: {
        title: "Website Development Process",
        steps: [
            { title: "Discovery Meeting", desc: "The process begins with a discovery meeting discussing the client's goals and expectations in detail.", icon: Search },
            { title: "Requirement Gathering", desc: "Detailed requirements are systematically collected to ensure that the project's scope aligns precisely with the client's needs.", icon: List },
            { title: "Technical Consultation", desc: "Our subject matter experts (SMEs) provide an overview of the tech roadmap, outlining most suitable technologies.", icon: Users },
            { title: "Scope Document", desc: "A detailed scope specification document is created based on project requirements, detailing key deliverables.", icon: FileText },
            { title: "Iterative Scope Refinement", desc: "The scope document undergoes iterative refinements based on client feedback to ensure complete alignment.", icon: Settings },
            { title: "Project Proposal", desc: "We present a final formal project proposal outlining the specific costs, timelines, and key milestones.", icon: Target },
            { title: "Agreement & Contract Signing", desc: "Once the proposal is approved, the terms are finalized and the contract is executed to formalize engagement.", icon: CheckCircle },
            { title: "Project Onboarding", desc: "The project gets initiated with a clearly defined roadmap and a dedicated project manager.", icon: Rocket }
        ]
    },
    software: {
        title: "Software Development Process",
        steps: [
            { title: "Project Discovery & Sprint Planning", desc: "The process initiates with an in-depth project discovery, followed by proper sprint planning sessions.", icon: Search },
            { title: "Backlog Creation & Prioritization", desc: "Tasks are organized and prioritized in the project backlog, ensuring most critical features are developed first.", icon: List },
            { title: "Sprint-based Execution with CI/CD", desc: "The project is executed in strategically planned sprints, incorporating continuous integration and deployment.", icon: Play },
            { title: "Enterprise-Grade Architecture", desc: "We design the application with an emphasis on scalability and robust architecture, ensuring it can handle growth.", icon: Monitor },
            { title: "Continuous Testing & Security Audits", desc: "Throughout the project, we conduct rigorous testing, performance optimizations, and security audits.", icon: Shield },
            { title: "Cloud Deployment & Monitoring", desc: "Once deployed, we monitor the application, continuously optimizing performance and implementing enhancements.", icon: Rocket }
        ]
    },
    marketing: {
        title: "Digital Marketing Process",
        steps: [
            { title: "Market Research & Analysis", desc: "We analyze competitor landscapes, target demographics, and market trends to establish a baseline.", icon: Search },
            { title: "Strategy Formulation", desc: "Creating a comprehensive multi-channel digital roadmap aligned with your specific business conversion targets.", icon: Target },
            { title: "Campaign Execution", desc: "Launching targeted ads, SEO optimizations, and content updates smoothly across specified platforms.", icon: Rocket },
            { title: "Performance Optimization", desc: "A/B testing, fine-tuning keyword strategies, and adjusting audience configurations for maximum ROI.", icon: TrendingUp },
            { title: "Reporting & Insights", desc: "Delivering fully transparent data analytics dashboards tracking user growth, acquisition costs, and conversion metrics.", icon: BarChart }
        ]
    },
    appDev: {
        title: "Application Development Process",
        steps: [
            { title: "Requirement Analysis", desc: "Understanding the core purpose and identifying key user personas for the mobile or web application.", icon: Search },
            { title: "UI/UX Prototyping", desc: "Creating high-fidelity wireframes and interactive prototypes to visualize the application flow.", icon: Layout },
            { title: "Core Engineering", desc: "Developing robust application logic, integrating APIs, and building a highly responsive interface.", icon: Code },
            { title: "Quality Assurance", desc: "Rigorous testing across multiple devices and platforms to ensure zero bugs and seamless performance.", icon: Shield },
            { title: "App Store Deployment", desc: "Launching the application securely to the App Store, Google Play, or enterprise web servers.", icon: Rocket },
            { title: "Post-Launch Support", desc: "Providing continuous maintenance, feature updates, and performance monitoring.", icon: RefreshCw }
        ]
    },
    logoDesign: {
        title: "Logo Designing Process",
        steps: [
            { title: "Brand Discovery", desc: "Analyzing your brand identity, target audience, and core values to establish a design direction.", icon: Search },
            { title: "Conceptualization", desc: "Brainstorming and sketching multiple creative directions and initial logo concepts.", icon: Edit3 },
            { title: "Digital Rendering", desc: "Transforming the best sketches into polished, highly scalable vector graphics.", icon: PenTool },
            { title: "Color & Typography", desc: "Selecting the perfect color palettes and typography to complement the brand's unique visual language.", icon: Palette },
            { title: "Client Refinement", desc: "Presenting the concepts to the client and iteratively refining the design based on direct feedback.", icon: Settings },
            { title: "Final Delivery", desc: "Delivering the finalized logo in all necessary formats (SVG, PNG, EPS) for print and digital media.", icon: CheckCircle }
        ]
    }
};

const Processes = () => {
    const [activeTab, setActiveTab] = useState('website');
    const containerRef = useRef(null);

    // Track scroll progress to draw the timeline line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 75%", "end 50%"],
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    return (
        <section className={styles.processContainer} id="process" ref={containerRef}>
            <div className={styles.processHeader}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Our Processes
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    A structured process for seamless project execution. From understanding your requirements to the final solution, we ensure proactive services based on your business needs.
                </motion.p>
            </div>

            <div className={styles.processContentWrapper}>
                {/* Left Side: Interactive Navigation Tabs */}
                <div className={styles.processSidebar}>
                    {Object.keys(serviceData).map((tabKey) => (
                        <motion.button
                            key={tabKey}
                            className={`${styles.sidebarBtn} ${activeTab === tabKey ? styles.active : ''}`}
                            onClick={() => {
                                setActiveTab(tabKey);
                                containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {serviceData[tabKey].title.replace(' Process', '')}
                            <span className={styles.arrowIcon}>➔</span>
                        </motion.button>
                    ))}
                </div>

                {/* Right Side: Timeline Display */}
                <div className={styles.processTimelineWrapper}>
                    <motion.div
                        className={styles.timelineLine}
                        style={{ scaleY, transformOrigin: "top" }}
                    ></motion.div>

                    <div className={styles.timelineList}>
                        {serviceData[activeTab].steps.map((step, index) => (
                            <motion.div
                                className={styles.timelineItem}
                                key={`${activeTab}-${index}`}
                                initial={{ opacity: 0, rotateX: -45, y: 40, transformPerspective: 1000 }}
                                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03, zIndex: 10 }}
                            >
                                {/* Custom Geometric Nodes */}
                                <div className={styles.timelineNode}>
                                    <span className={styles.nodeIcon}><step.icon size={16} /></span>
                                    {/* Creative animated pulse ring */}
                                    <div className={styles.nodePulse}></div>
                                </div>

                                {/* Content Box */}
                                <div className={styles.timelineCard}>
                                    {/* Sweep animation div */}
                                    <div className={styles.glowSweep}></div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Processes;
