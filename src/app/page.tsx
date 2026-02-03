import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#a477e1] text-white p-8">
      
      {/* Main Content Container */}
      <div className="text-center max-w-3xl">

        {/* 1. Headline */}
        <h1 className="text-5xl md:text-7xl font-bold font-mono mb-4">
          Hello! I'm Stephanie
        </h1>

        {/* 2. Sub-headline */}
        <p className="text-xl md:text-2xl text-white-200 mb-8">
          I am a computer scientist & neuroscience researcher.
          My aim is to leverage computer-brain interfaces and related technology in order to find a cure for schizophrenia.
        </p>

        {/* 3. Call-to-Action (CTA) Button */}
        <a
          href="/projects" // This will link to src/app/projects/page.tsx
          className="inline-flex items-center gap-2 bg-[#8b55d0] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[#7e2eea] transition-colors duration-300"
        >
          View My Work
          <HiArrowRight/>
        </a>

        {/* 4. Social Links */}
        <div className="flex justify-center gap-6 mt-12">
          <a
            href="https://github.com/st3phable" // Add your GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-400 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={32} />
          </a>
          
          <a
            href="https://linkedin.com/in/stephanie-rosales-diaz-8a5558172/" // Add your LinkedIn link
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-400 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={32} />
          </a>
        </div>

      </div>
    </main>
  );
}