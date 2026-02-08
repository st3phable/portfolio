"use client";
import React, { useState, useEffect } from 'react';

/**
 * NEURAL VISUALIZER COMPONENT
 * ------------------------------------------------------------------
 * A computational psychiatry simulation that models the Excitatory/Inhibitory (E/I) 
 * balance of a neural circuit.
 * * - Dopamine acts as the "Gain" (signal amplification).
 * - GABA acts as the "Threshold" (signal dampening/subtraction).
 * * The visualizer uses a 4x3 grid (12 neurons) to represent a localized cortical patch.
 */

const NeuralVisualizer = () => {
  // --- STATE MANAGEMENT ---
  
  // Gain Parameter (Excitatory): Multiplies the raw input signal.
  // Higher values simulate hyper-dopaminergic states (e.g., Mania).
  const [dopamine, setDopamine] = useState(1.5); 

  // Threshold Parameter (Inhibitory): Subtracts from the potential.
  // Higher values simulate strong GABAergic inhibition (e.g., Sedation).
  const [gaba, setGaba] = useState(20);          
  
  // Grid Configuration:
  // We use 12 neurons (4x3 layout) to fit rectangular desktop screens without overflow.
  const neuronCount = 12;
  const [activations, setActivations] = useState(new Array(neuronCount).fill(0));

// --- SIMULATION LOOP ---
  // This effect runs every 200ms to update the firing state of the neurons.
  useEffect(() => {
    const interval = setInterval(() => {
        setActivations(prev => prev.map(() => {
          // 1. Generate stochastic noise (random sensory input 0-100)
            const rawInput = Math.random() * 100; 
          // 2. Apply the Neural Transfer Function: Output = (Input * Gain) - Inhibition  
            let netPotential = (rawInput * dopamine) - gaba; 
            // 3. Rectification (ReLU): Neurons cannot have negative firing rates.
            return Math.max(0, netPotential);
        }));
    }, 200); 
    // Cleanup interval on unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [dopamine, gaba]);

  // --- DIAGNOSTIC ENGINE ---
  // Classifies the network state based on the E/I parameters.
  const getDiagnosis = () => {
    if (dopamine > 2.5 && gaba < 15) return "STATUS: HYPER-ACTIVE (MANIA)";
    if (dopamine < 0.8 || gaba > 60) return "STATUS: HYPO-ACTIVE (SEDATION)";
    return "STATUS: HOMEOSTASIS";
  };

  return (
    // MAIN CONTAINER
    // h-full & w-full: Fills the parent card.
    // overflow-hidden: Critical fix to prevent child elements from breaking the layout.
    // relative: Establishes a stacking context for z-index.
    <div className="flex flex-col justify-between p-6 bg-[#2d1b4e] border-none shadow-none w-full h-full overflow-hidden relative">
      
      {/* Header */}
      <div className="mb-4 text-center shrink-0 z-10 relative">
        <h2 className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight">
          Neural Activation
        </h2>
        <p className="text-xs text-[#d8b4fe] mt-1 font-mono uppercase tracking-widest opacity-80">
           in silico visualization
        </p>
      </div>

      {/* The Visual Grid 
      */}
      <div className="grid grid-cols-4 gap-4 justify-items-center items-center flex-grow content-center w-full max-w-[20rem] mx-auto z-0">
        {activations.map((val, i) => (
          <div 
            key={i}
            // Neuron Styling:
            // aspect-square: Ensures perfectly round circles regardless of width.
            // opacity: Maps the firing rate directly to visual brightness.
            className="w-full aspect-square rounded-full transition-all duration-200 ease-in-out border border-white/10"
            style={{
              backgroundColor: `rgb(255, 255, 255)`, 
              opacity: Math.min(val / 100, 1),      
              boxShadow: `0 0 ${val / 3}px rgba(255, 255, 255, 0.8)` 
            }}
          />
        ))}
      </div>

      {/* The Controls */}
      <div className="space-y-4 bg-[#1a0f2e] p-4 rounded-xl border border-[#8b55d0]/20 shrink-0 z-10 relative">
        
        {/* Slider 1: Dopamine */}
        <div>
          <div className="flex justify-between text-white mb-1 font-mono text-xs">
            <label className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a477e1]"></span>
                GAIN (Dopamine)
            </label>
            <span className="text-[#a477e1]">{dopamine.toFixed(1)}x</span>
          </div>
          <input 
            type="range" 
            min="0.1" max="5.0" step="0.1"
            value={dopamine}
            onChange={(e) => setDopamine(parseFloat(e.target.value))}
            className="w-full h-1 bg-[#2d1b4e] rounded-lg appearance-none cursor-pointer accent-[#a477e1]"
          />
        </div>

        {/* Slider 2: GABA */}
        <div>
          <div className="flex justify-between text-white mb-1 font-mono text-xs">
            <label className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f472b6]"></span>
                THRESHOLD (GABA)
            </label>
            <span className="text-[#f472b6]">-{gaba}mV</span>
          </div>
          <input 
            type="range" 
            min="0" max="100" step="5"
            value={gaba}
            onChange={(e) => setGaba(parseInt(e.target.value))}
            className="w-full h-1 bg-[#2d1b4e] rounded-lg appearance-none cursor-pointer accent-[#f472b6]"
          />
        </div>

        {/* Dynamic Status 
            Changes color based on diagnosis*/}
        <div className="pt-2 border-t border-white/10 mt-2">
             <p className={`text-center font-mono font-bold text-xs tracking-widest transition-colors duration-300 ${
                 getDiagnosis().includes("HOMEOSTASIS") ? "text-[#a477e1]" : 
                 getDiagnosis().includes("HYPER") ? "text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" : "text-gray-500"
             }`}>
                {getDiagnosis()}
             </p>
        </div>

      </div>
    </div>
  );
};

export default NeuralVisualizer;