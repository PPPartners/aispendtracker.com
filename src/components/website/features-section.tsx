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
            Everything You Need to Track AI Spend
          </h2>
          <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            Built for developers and founders who need clarity on their AI costs
            without the spreadsheet headaches.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Database className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">API Integrations</CardTitle>
              <CardDescription>
                Direct connections to OpenAI, Anthropic, Google AI, and more. No
                manual data entry required.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">CSV/JSON Upload</CardTitle>
              <CardDescription>
                Easily import data from any provider not directly supported with
                our smart parser.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Visual Dashboard</CardTitle>
              <CardDescription>
                Interactive charts and graphs to visualize your spend by tool,
                project, or time period.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Bell className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Budget Alerts</CardTitle>
              <CardDescription>
                Set monthly or per-project budgets and get notified when
                you&apos;re approaching your limits.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <LineChart className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Spend Forecasting</CardTitle>
              <CardDescription>
                Predict your end-of-month costs based on current usage patterns
                and historical data.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CreditCard className="h-10 w-10 text-emerald-500" />
              <CardTitle className="mt-4">Cost Breakdown</CardTitle>
              <CardDescription>
                See exactly which models and features are driving your costs
                with detailed breakdowns.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
