import { Button } from "@/components/ui/button";

export default function SignUpSection() {
  return (
    <section
      id="signup"
      className="w-full py-12 md:py-24 lg:py-32 bg-black text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-zinc-800 px-3 py-1 text-sm">
            <span className="font-semibold text-emerald-500">Early Access</span>
          </div>
          <h2 className="text-3xl max-w-[650px] font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Take Control of Your AI Spend Before It Controls You
          </h2>
          <p className="max-w-[700px] text-zinc-400 md:text-xl">
            Get clarity before your next invoice surprises you.
          </p>
        </div>

        <div className="max-w-[600px] mx-auto flex flex-col items-center space-y-4">
          <div className="w-full flex flex-col sm:flex-row items-center gap-2">
            <label htmlFor="email-signup" className="sr-only">
              Email
            </label>
            <input
              id="email-signup"
              type="email"
              placeholder="you@example.com"
              className="flex-grow w-full sm:w-auto rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm text-white placeholder:text-zinc-400"
            />
            <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600">
              Join Waitlist
            </Button>
          </div>
          <p className="text-xs text-zinc-500">
            No spam. We&apos;ll only reach out once you are in or when it&apos;s
            live.
          </p>
        </div>
      </div>
    </section>
  );
}
