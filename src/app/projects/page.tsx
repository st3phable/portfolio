"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// IMPORT YOUR NEW COMPONENT
import NeuralVisualizer from "@/components/NeuralVisualizer";

// 1. The Project Data
const projects = [
  {
    id: 1,
    title: "Neural Activation Visualizer",
    category: "Computational Neuroscience",
    description: "A real-time simulation of neural network activation patterns. This project models how neurological abnormalities (like those in Schizophrenia) can be represented mathematically.",
    tech: ["React", "D3.js", "Matrix Math"],
    status: "In Progress",
    link: "https://github.com/st3phable/neural-viz",
  },
  {
    id: 2,
    title: "Lifemaxxing Dashboard",
    category: "UI/UX & Gamification",
    description: "Turning daily habits into an RPG. This dashboard uses the Notion API to track 'XP' for tasks, featuring a cozy, nature-inspired interface.",
    tech: ["Next.js", "Notion API", "Tailwind"],
    status: "Live",
    link: "#",
  },
  {
    id: 3,
    title: "Academics Vault",
    category: "Knowledge Management",
    description: "A 'Second Brain' system built to manage the dual workload of a Psychology and Computer Science degree.",
    tech: ["Obsidian", "Markdown", "Automation"],
    status: "Maintenance",
    link: "#",
  },
];

export default function ProjectDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation Logic
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1 === projects.length ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#a477e1] text-white p-4 md:p-8">
      
      {/* Header */}
      <div className="mb-12 text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-sans font-bold mb-4 tracking-tight">
          My projects
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-sans">
          Bridging Computer Science & Psychology.
        </p>
      </div>

      {/* The Carousel Container */}
      <div className="relative w-full max-w-5xl aspect-[4/5] md:aspect-[2/1]">
        
        {/* Navigation Buttons */}
        <button 
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
        >
            <HiArrowLeft size={24} />
        </button>
        <button 
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
        >
            <HiArrowRight size={24} />
        </button>

        {/* The Card */}
        <div className="relative w-full h-full overflow-hidden rounded-3xl bg-white shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={projects[currentIndex].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col md:flex-row h-full"
            >
              
              {/* Left Side: "Visual" Area */}
              <div className="w-full md:w-1/2 bg-[#2d1b4e] flex items-center justify-center border-r border-gray-100 overflow-hidden relative">                
                {/* CONDITIONAL RENDERING: Show Visualizer ONLY for Project 1 */}
                {projects[currentIndex].id === 1 ? (
                    <div className="w-full h-full"> 
                        <NeuralVisualizer />
                    </div>
                ) : (
                    // Default Placeholder for other projects
                    <div className="text-center">
                        <div className="text-6xl mb-4 opacity-20 grayscale">
                             {/* You can map emojis to project IDs later */}
                             {projects[currentIndex].id === 2 ? "🐸" : "📚"}
                        </div>
                        <p className="text-gray-400 font-mono text-sm">
                            {projects[currentIndex].title} Preview
                        </p>
                    </div>
                )}
                
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white text-gray-900">
                
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8b55d0] mb-4">
                  {projects[currentIndex].category}
                </span>
                
                <h2 className="font-sans text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  {projects[currentIndex].title}
                </h2>

                <p className="font-sans text-lg text-gray-600 mb-8 leading-relaxed">
                  {projects[currentIndex].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {projects[currentIndex].tech.map((tech) => (
                    <span 
                        key={tech} 
                        className="font-mono text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <a
                    href={projects[currentIndex].link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-3 rounded-lg font-sans font-medium hover:bg-black transition-colors"
                  >
                    <FaGithub /> View Code
                  </a>
                  {projects[currentIndex].status === "Live" && (
                     <a href="#" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-sans font-medium hover:bg-gray-50 transition-colors">
                        <FaExternalLinkAlt size={12}/> Live Demo
                     </a>
                  )}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}