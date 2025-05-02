import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignUpSection() {
  return (
    <section
      id="signup"
      className="w-full py-12 md:py-24 lg:py-32 bg-black text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-zinc-800 px-3 py-1 text-sm w-fit">
              <span className="font-semibold text-emerald-500">
                Early Access
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join the AI Spend Tracker Beta
            </h2>
            <p className="max-w-[600px] text-zinc-400 md:text-xl">
              Be among the first to gain control over your AI spending. Sign up
              for early access and help shape the future of AI cost management.
            </p>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-emerald-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Free access during beta period</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-emerald-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Priority access to new features</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-emerald-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Influence product development</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-emerald-500"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Special pricing when we launch</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle>Get Early Access</CardTitle>
                <CardDescription className="text-zinc-400">
                  Join our waitlist for exclusive beta access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm text-white placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm text-white placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Company/Project
                  </label>
                  <input
                    type="text"
                    placeholder="Your company or project name"
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm text-white placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    What AI services do you use?
                  </label>
                  <textarea
                    placeholder="OpenAI, Anthropic, etc."
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm text-white placeholder:text-zinc-400"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Join Waitlist
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
