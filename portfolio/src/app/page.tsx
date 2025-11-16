import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      
      {/* Main Content Container */}
      <div className="text-center max-w-3xl">

        {/* 1. Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Hello, I'm Stephanie
        </h1>

        {/* 2. Sub-headline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          I'm a Computer Scientist & Academic Researcher building for the web.
        </p>

        {/* 3. Call-to-Action (CTA) Button */}
        <a
          href="/projects" // This will link to src/app/projects/page.tsx
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors duration-300"
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
            className="text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={32} />
          </a>
          
          <a
            href="https://linkedin.com/in/stephanie-rosales-diaz-8a5558172/" // Add your LinkedIn link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={32} />
          </a>
        </div>

      </div>
    </main>
  );
}