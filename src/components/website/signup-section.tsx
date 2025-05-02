"use client"; // Mark as Client Component

import WaitlistForm from "./waitlist-form"; // Import the reusable form

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

        <WaitlistForm className="mx-auto" />
      </div>
    </section>
  );
}
