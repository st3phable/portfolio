"use client";
import React, { useState, useEffect } from 'react';

const NeuralVisualizer = () => {
  const [dopamine, setDopamine] = useState(1.5); 
  const [gaba, setGaba] = useState(20);          
  
  const neuronCount = 12;
  const [activations, setActivations] = useState(new Array(neuronCount).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
        setActivations(prev => prev.map(() => {
            const rawInput = Math.random() * 100; 
            let netPotential = (rawInput * dopamine) - gaba; 
            return Math.max(0, netPotential);
        }));
    }, 200); 

    return () => clearInterval(interval);
  }, [dopamine, gaba]);

  const getDiagnosis = () => {
    if (dopamine > 2.5 && gaba < 15) return "STATUS: HYPER-ACTIVE (MANIA)";
    if (dopamine < 0.8 || gaba > 60) return "STATUS: HYPO-ACTIVE (SEDATION)";
    return "STATUS: HOMEOSTASIS";
  };

  return (
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

        {/* Dynamic Status */}
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