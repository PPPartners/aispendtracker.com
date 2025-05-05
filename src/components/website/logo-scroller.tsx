"use client";

import Image from "next/image";

const logos = [
  { src: "/ai-logos/openai-text-logo.png", alt: "OpenAI Logo" },
  { src: "/ai-logos/cursor-text-logo.png", alt: "Cursor AI Logo" },
  { src: "/ai-logos/notion-text-logo.png", alt: "Notion AI Logo" },
  { src: "/ai-logos/elevenlabs-text-logo.png", alt: "ElevenLabs Logo" },
  { src: "/ai-logos/intercom-text-logo.png", alt: "Intercom Logo" },
  { src: "/ai-logos/claude-text-logo.png", alt: "Claude AI Logo" },
  { src: "/ai-logos/Canva-text-logo.png", alt: "Canva AI Logo" },
  { src: "/ai-logos/gemini-text-logo.png", alt: "Google Gemini Logo" },
  { src: "/ai-logos/windsurf-text-logo.png", alt: "Windsurf Logo" },
  { src: "/ai-logos/runway-text-logo.png", alt: "RunwayML Logo" },
  { src: "/ai-logos/openai-text-logo.png", alt: "OpenAI Logo" },
  { src: "/ai-logos/copilot-text-logo.png", alt: "GitHub Copilot Logo" },
  { src: "/ai-logos/cursor-text-logo.png", alt: "Cursor AI Logo" },
  { src: "/ai-logos/notion-text-logo.png", alt: "Notion AI Logo" },
  { src: "/ai-logos/elevenlabs-text-logo.png", alt: "ElevenLabs Logo" },
  { src: "/ai-logos/intercom-text-logo.png", alt: "Intercom Logo" },
  { src: "/ai-logos/claude-text-logo.png", alt: "Claude AI Logo" },
  { src: "/ai-logos/Canva-text-logo.png", alt: "Canva AI Logo" },
  { src: "/ai-logos/gemini-text-logo.png", alt: "Google Gemini Logo" },
  { src: "/ai-logos/windsurf-text-logo.png", alt: "Windsurf Logo" },
  { src: "/ai-logos/runway-text-logo.png", alt: "RunwayML Logo" },
  { src: "/ai-logos/openai-text-logo.png", alt: "OpenAI Logo" },
  { src: "/ai-logos/copilot-text-logo.png", alt: "GitHub Copilot Logo" },
  { src: "/ai-logos/cursor-text-logo.png", alt: "Cursor AI Logo" },
  { src: "/ai-logos/notion-text-logo.png", alt: "Notion AI Logo" },
  { src: "/ai-logos/elevenlabs-text-logo.png", alt: "ElevenLabs Logo" },
  { src: "/ai-logos/intercom-text-logo.png", alt: "Intercom Logo" },
  { src: "/ai-logos/claude-text-logo.png", alt: "Claude AI Logo" },
  { src: "/ai-logos/Canva-text-logo.png", alt: "Canva AI Logo" },
  { src: "/ai-logos/gemini-text-logo.png", alt: "Google Gemini Logo" },
  { src: "/ai-logos/windsurf-text-logo.png", alt: "Windsurf Logo" },
  { src: "/ai-logos/runway-text-logo.png", alt: "RunwayML Logo" },
];

export default function LogoScroller() {
  // Duplicate logos for seamless animation
  const extendedLogos = [...logos, ...logos];

  return (
    <section className="w-full py-8 md:py-16 lg:py-8 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 md:mb-12">
          You&apos;re Paying for 10+ AI Tools. Can You Name Them All?
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {extendedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-6 inline-flex items-center justify-center"
                style={{ width: "100px" }} // Adjust width as needed
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={40} // Adjust height based on logo aspect ratios
                  className="object-contain h-10 w-auto transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
