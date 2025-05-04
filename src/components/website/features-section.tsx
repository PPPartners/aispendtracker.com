import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Database,
  FileText,
  BarChart3,
  Bell,
  LineChart,
  CreditCard,
  LucideIcon,
} from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: Database,
    title: "Smart API Integrations",
    description:
      "Connect OpenAI, Anthropic, and more in seconds. No scraping or manual entry: just connect and go.",
  },
  {
    icon: BarChart3,
    title: "Visual Spend Dashboard",
    description:
      "One glance = total clarity. Interactive graphs and breakdowns by tool, project, and time. Designed for speed and sanity.",
  },
  {
    icon: Bell,
    title: "Budget Alerts",
    description:
      "Catch costs before they snowball. Set caps by month or by project and get notified before your card gets hit.",
  },
  {
    icon: LineChart,
    title: "Spend Forecasting",
    description:
      "Know your burn before it burns you. See projected end-of-month spend based on current usage trends.",
  },
  {
    icon: CreditCard,
    title: "Deep Cost Attribution",
    description:
      "Which model? Which feature? Which project? Break spend down by model type, usage tier, or internal tag.",
  },
  {
    icon: FileText,
    title: "Weekly Spend Report",
    description:
      "A simple summary, delivered to your inbox. Track your burn without logging in. Opt out anytime.",
  },
];

const DashboardMockup = () => (
  <div className="relative w-full max-w-[600px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
    <div className="flex items-center gap-2 border-b border-zinc-800 p-2">
      <div className="h-3 w-3 rounded-full bg-red-500" />
      <div className="h-3 w-3 rounded-full bg-yellow-500" />
      <div className="h-3 w-3 rounded-full bg-green-500" />
      <div className="ml-2 text-xs text-zinc-400">AI Spend Dashboard</div>
    </div>
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-zinc-900 p-4">
          <div className="text-xs text-zinc-400">Monthly Spend</div>
          <div className="text-2xl font-bold text-emerald-500">$1,945</div>
          <div className="text-xs text-zinc-400">+12% from last month</div>
        </div>
        <div className="rounded-lg bg-zinc-900 p-4">
          <div className="text-xs text-zinc-400">Budget Used</div>
          <div className="text-2xl font-bold text-amber-500">99%</div>
          <div className="text-xs text-zinc-400">$1,945 of $2,000</div>
        </div>
        <div className="rounded-lg bg-zinc-900 p-4">
          <div className="text-xs text-zinc-400">Top Service</div>
          <div className="text-2xl font-bold">OpenAI</div>
          <div className="text-xs text-zinc-400">$1345 this month</div>
        </div>
      </div>
      <div className="h-[200px] rounded-lg bg-zinc-900 p-4">
        <div className="mb-2 text-sm font-medium">Spend Over Time</div>
        <div className="flex h-[150px] w-full">
          <div className="relative flex-1 flex flex-col">
            <div className="relative flex-1">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border-t border-zinc-800 w-full h-0"
                  ></div>
                ))}
              </div>

              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 300 140"
              >
                <path
                  d="M0,120 C 80,120 150,100 200,70 C 250,40 280,10 300,5"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  className="drop-shadow-md"
                />
                <path
                  d="M0,120 C 80,120 150,100 200,70 C 250,40 280,10 300,5 V140 H0 Z"
                  fill="url(#feature-gradient)"
                  opacity="0.2"
                />
                <defs>
                  <linearGradient
                    id="feature-gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

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
);

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 lg:mb-16">
          <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
            <span className="font-semibold">Features</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Stop Wondering Where Your Money Went
          </h2>
          <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            Built for AI builders who are sick of digging through billing
            portals, guessing their burn, and dreading end-of-month surprises.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-emerald-500" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="hidden lg:flex relative h-[700px] items-center justify-center mt-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <DashboardMockup />
          </div>

          {features.map((feature, index) => {
            let positionClasses = "";
            switch (index) {
              case 0: // Top-left
                positionClasses =
                  "top-[10%] left-[15%] -translate-x-1/2 -translate-y-1/2";
                break;
              case 1: // Top-right
                positionClasses =
                  "top-[10%] right-[15%] translate-x-1/2 -translate-y-1/2";
                break;
              case 2: // Middle-left
                positionClasses =
                  "top-1/2 left-[5%] -translate-x-1/2 -translate-y-1/2";
                break;
              case 3: // Middle-right
                positionClasses =
                  "top-1/2 right-[5%] translate-x-1/2 -translate-y-1/2";
                break;
              case 4: // Bottom-left
                positionClasses =
                  "bottom-[10%] left-[15%] -translate-x-1/2 translate-y-1/2";
                break;
              case 5: // Bottom-right
                positionClasses =
                  "bottom-[10%] right-[15%] translate-x-1/2 translate-y-1/2";
                break;
              default: // Fallback or center (though we only have 6)
                positionClasses =
                  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"; // Hide if more than 6
            }
            return (
              <div
                key={index}
                className={`absolute flex items-center justify-center w-32 h-32 p-4 rounded-full bg-zinc-800 border border-zinc-700 shadow-lg text-center text-white transition-all duration-300 hover:scale-110 z-20 ${positionClasses}`}
              >
                <div className="flex flex-col items-center">
                  <feature.icon className="h-8 w-8 text-emerald-500 mb-2" />
                  <span className="text-xs font-semibold">{feature.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
