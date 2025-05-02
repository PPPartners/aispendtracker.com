"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { usePostHog } from "posthog-js/react";

interface WaitlistFormProps {
  className?: string; // Allow passing additional classes
  location: "hero" | "signup"; // Add location prop
}

export default function WaitlistForm({
  className,
  location,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const posthog = usePostHog();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setErrorMessage(null);

    if (posthog) {
      posthog.capture("cta_clicked", { location });
    }

    if (!email) {
      setErrorMessage("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok || response.status === 303 || response.redirected) {
        setIsSuccess(true);
        setEmail("");
        if (posthog) {
          posthog.capture("waitlist_signup");
        }
      } else {
        let errorMsg = "An error occurred. Please try again.";
        try {
          const data = await response.json();
          errorMsg = data.error || data.message || errorMsg;
        } catch {
          // Ignore parsing error
        }
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-md space-y-4 ${className}`}>
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="email-waitlist" className="sr-only">
              Email
            </label>
            <Input
              id="email-waitlist" // Use a generic ID
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              disabled={isLoading}
              required
              className="flex-grow w-full sm:w-auto rounded-md border border-zinc-800 bg-zinc-900 text-sm text-white placeholder:text-zinc-400 focus-visible:ring-emerald-500"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoading ? "Joining..." : "Join Waitlist"}
            </Button>
          </div>
          <p className="text-xs text-zinc-500 text-center">
            No spam. We&apos;ll only reach out once you are in or when it&apos;s
            live.
          </p>
        </form>
      ) : null}

      {isSuccess && (
        <Alert
          variant="default"
          className="bg-green-900 border-green-700 text-green-100"
        >
          <AlertTitle className="font-bold">Success!</AlertTitle>
          <AlertDescription>
            Thanks for joining! Please check your email for a confirmation link.
          </AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
