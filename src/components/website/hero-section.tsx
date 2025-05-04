"use client"; // Mark as Client Component

import WaitlistForm from "./waitlist-form"; // Import the reusable form

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-40 md:pb-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 l lg:gap-12 ">
          <div className="flex flex-col justify-center space-y-4 ">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl xl:text-7xl text-center">
              You&apos;re Shipping Fast. <br />
              <span className="text-emerald-500">
                You&apos;re Spending on AI Faster.
              </span>
            </h1>
            <p className="max-w-[600px] text-zinc-400 text-lg text-center lg:text-left mx-auto">
              How much did you spend on AI tools and services last month? If you
              had to guess, you need this tool. One dashboard. Total visibility.
            </p>
            <div className="mt-6">
              <WaitlistForm className="max-w-lg mx-auto" location="hero" />
            </div>
          </div>
          {/* Hide this column on mobile/tablet, show on lg+ */}
        </div>
      </div>
    </section>
  );
}
