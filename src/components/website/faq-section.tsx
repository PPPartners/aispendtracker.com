import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
            <span className="font-semibold">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            Everything you need to know about AI Spend Tracker
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle>How secure is my billing data?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">
                We take security seriously. All API keys are encrypted at rest
                using AES-256, and we only request read-only access to your
                billing data. We never store your actual API credentials in
                plain text, and all data transfers are encrypted with TLS 1.2+.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Which AI services do you support?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">
                We currently support direct API connections with OpenAI,
                Anthropic, Google AI, and Hugging Face. For other services, you
                can upload CSV or JSON invoice exports. We&apos;re constantly
                adding more direct integrations based on user demand.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Can I track non-AI SaaS expenses too?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">
                While we&apos;re optimized for AI services, you can track any
                SaaS expense by uploading invoice data or connecting through
                Stripe. Many of our users track their entire tech stack spending
                in one place.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How do budget alerts work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">
                You can set monthly or per-project budget thresholds. When your
                spending reaches 75%, 90%, or 100% of your budget, we&apos;ll
                send you alerts via email or Slack (depending on your plan).
                This helps prevent unexpected cost overruns.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Do you offer a free trial?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 dark:text-zinc-400">
                During our beta period, we&apos;re offering free access with
                limited features. This allows you to test the platform and
                provide feedback. After the beta period, we&apos;ll transition
                to our regular pricing plans with a 14-day free trial.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
