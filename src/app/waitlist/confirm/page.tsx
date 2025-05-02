"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Define states for the confirmation process
type ConfirmationStatus = "verifying" | "success" | "error" | "idle";

function WaitlistConfirmContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<ConfirmationStatus>("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (token && status === "idle") {
      setStatus("verifying");
      setMessage("Verifying your email address...");

      fetch(`/api/waitlist/confirm?token=${token}`)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            // Throw an error with the message from the API response or a default one
            throw new Error(data.error || "Verification failed.");
          }
          setStatus("success");
          setMessage(data.message || "Email confirmed successfully!");
          // Optionally redirect after a delay or based on API response
          // setTimeout(() => router.push('/login'), 3000);
        })
        .catch((error) => {
          console.error("Confirmation fetch error:", error);
          setStatus("error");
          setMessage(error.message || "An error occurred during verification.");
        });
    } else if (!token && status === "idle") {
      setStatus("error");
      setMessage("Confirmation token is missing.");
    }
  }, [token, status]); // Depend on token and status to prevent re-running unnecessarily

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Waitlist Confirmation
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {status === "verifying" && (
            <p className="text-center text-lg text-gray-600">{message}</p>
            // Add a spinner here if desired
          )}
          {status === "success" && (
            <div className="text-center">
              <p className="text-lg font-medium text-green-600">{message}</p>
              <p className="mt-2 text-gray-600">
                Thank you for confirming! We&apos;ll keep you updated.
              </p>
              {/* TODO: Add form for additional info here if needed */}
              <Link
                href="/login"
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
              >
                Proceed to Login (when available)
              </Link>
            </div>
          )}
          {status === "error" && (
            <div className="text-center">
              <p className="text-lg font-medium text-red-600">Error</p>
              <p className="mt-2 text-gray-600">{message}</p>
              <p className="mt-2 text-gray-600">
                Please try the link again or contact support if the issue
                persists.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrap the component in Suspense because useSearchParams requires it
export default function WaitlistConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WaitlistConfirmContent />
    </Suspense>
  );
}
