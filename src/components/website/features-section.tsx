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
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
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
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Database className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Smart API Integrations</CardTitle>
              <CardDescription>
                Connect OpenAI, Anthropic, and more in seconds. No scraping or
                manual entry: just connect and go.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Visual Spend Dashboard</CardTitle>
              <CardDescription>
                One glance = total clarity. Interactive graphs and breakdowns by
                tool, project, and time. Designed for speed and sanity.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Bell className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Budget Alerts</CardTitle>
              <CardDescription>
                Catch costs before they snowball. Set caps by month or by
                project and get notified before your card gets hit.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <LineChart className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Spend Forecasting</CardTitle>
              <CardDescription>
                Know your burn before it burns you. See projected end-of-month
                spend based on current usage trends.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CreditCard className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Deep Cost Attribution</CardTitle>
              <CardDescription>
                Which model? Which feature? Which project? Break spend down by
                model type, usage tier, or internal tag.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Weekly Spend Report</CardTitle>
              <CardDescription>
                A simple summary, delivered to your inbox. Track your burn
                without logging in. Opt out anytime.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
