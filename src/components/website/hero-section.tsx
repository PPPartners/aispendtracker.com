import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Zap, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-zinc-800 px-3 py-1 text-sm">
              <span className="font-semibold text-emerald-500">Beta</span> Now
              accepting early access sign-ups
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Track Your AI Spend{" "}
              <span className="text-emerald-500">Without The Chaos</span>
            </h1>
            <p className="max-w-[600px] text-zinc-400 md:text-xl">
              One dashboard for all your AI API and SaaS expenses. Connect
              billing feeds, upload invoices, and get instant clarity on where
              your money is going.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="#signup">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  See How It Works
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Secure Connections</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>Setup in Minutes</span>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3" />
                <span>Built for Developers</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[600px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 p-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div className="ml-2 text-xs text-zinc-400">
                  AI Spend Dashboard
                </div>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-zinc-900 p-4">
                    <div className="text-xs text-zinc-400">Monthly Spend</div>
                    <div className="text-2xl font-bold text-emerald-500">
                      $1,945
                    </div>
                    <div className="text-xs text-zinc-400">
                      +12% from last month
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-4">
                    <div className="text-xs text-zinc-400">Budget Used</div>
                    <div className="text-2xl font-bold text-amber-500">99%</div>
                    <div className="text-xs text-zinc-400">
                      $1,945 of $2,000
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-4">
                    <div className="text-xs text-zinc-400">Top Service</div>
                    <div className="text-2xl font-bold">OpenAI</div>
                    <div className="text-xs text-zinc-400">
                      $1345 this month
                    </div>
                  </div>
                </div>
                <div className="h-[200px] rounded-lg bg-zinc-900 p-4">
                  <div className="mb-2 text-sm font-medium">
                    Spend Over Time
                  </div>
                  <div className="flex h-[150px] w-full">
                    {/* Chart Area */}
                    <div className="relative flex-1 flex flex-col">
                      {/* SVG Container */}
                      <div className="relative flex-1">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="border-t border-zinc-800 w-full h-0"
                            ></div>
                          ))}
                        </div>

                        {/* Line chart SVG */}
                        <svg
                          className="absolute inset-0 h-full w-full"
                          preserveAspectRatio="none"
                          viewBox="0 0 300 140"
                        >
                          {/* Line path showing increasing trend */}
                          <path
                            d="M0,120 C 80,120 150,100 200,70 C 250,40 280,10 300,5"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            className="drop-shadow-md"
                          />
                          {/* Area under the line */}
                          <path
                            d="M0,120 C 80,120 150,100 200,70 C 250,40 280,10 300,5 V140 H0 Z"
                            fill="url(#gradient)"
                            opacity="0.2"
                          />
                          {/* Gradient definition */}
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#10b981"
                                stopOpacity="1"
                              />
                              <stop
                                offset="100%"
                                stopColor="#10b981"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      {/* X Labels - Moved inside Chart Area */}
                      <div className="flex justify-between text-xs text-zinc-400 pt-1">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>
                    {/* Y Labels */}
                    <div className="flex flex-col justify-between text-xs text-zinc-400 w-10 ml-2 pb-4 text-right">
                      <span>$2000</span>
                      <span>$1500</span>
                      <span>$1000</span>
                      <span>$500</span>
                      <span>$0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
