import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import HeroSection from "@/components/website/hero-section";
import FeaturesSection from "@/components/website/features-section";
import HowItWorksSection from "@/components/website/how-it-works-section";
//import PricingSection from "@/components/website/pricing-section";
import FaqSection from "@/components/website/faq-section";
import SignUpSection from "@/components/website/signup-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/aispendtracker-logo-white-tb.png"
              alt="AI Spend Tracker Logo"
              width={150}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">AI Spend Tracker</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </Link>
            {/* <Link
              href="#pricing"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Pricing
            </Link>
            */}
            <Link
              href="#faq"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#signup">
              <Button>Get Early Access</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        {/* <PricingSection /> */}
        <FaqSection />
        <SignUpSection />
      </main>
      <footer className="w-full border-t bg-zinc-100 py-6 dark:bg-zinc-900">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 pl-4">
            <Image
              src="/aispendtracker-logo-white-tb.png"
              alt="AI Spend Tracker Logo"
              width={150}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">AI Spend Tracker</span>
          </div>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} AI Spend Tracker. All rights reserved.
          </p>
          {/* <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
            >
              Contact
            </Link>
          </div>
          */}
        </div>
      </footer>
    </div>
  );
}
