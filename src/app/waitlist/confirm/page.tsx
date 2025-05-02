"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WaitlistSurveyForm from "@/components/website/waitlist-survey-form";

// Define states for the confirmation process
type ConfirmationStatus = "verifying" | "success" | "error" | "idle";

// Define shape for fetched entry data (nullable fields)
type EntryData = {
  id: number;
  confirmed_at: string | null;
  building_description?: string | null;
  used_providers?: string[] | null;
  tracking_method?: string | null;
  billing_frustration?: string | null;
  team_size?: string | null;
  reasonable_price?: string | null;
  feedback_call_interest?: string | null;
};

function WaitlistConfirmContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<ConfirmationStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [initialData, setInitialData] = useState<Partial<EntryData> | null>(
    null
  );
  const [entryId, setEntryId] = useState<number | null>(null);

  useEffect(() => {
    if (token && status === "idle") {
      setStatus("verifying");
      setMessage("Verifying your email address...");

      fetch(`/api/waitlist/confirm?token=${token}`)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "Verification failed.");
          }
          setStatus("success");

          // Log the entire data object received from the API
          console.log(
            "[Confirm Page] Received data from /api/waitlist/confirm:",
            JSON.stringify(data, null, 2)
          );

          setInitialData(data.entryData || null);
          if (data.entryData?.id) {
            setEntryId(data.entryData.id);
            console.log("[Confirm Page] Fetched entryId:", data.entryData.id);
          } else {
            console.error(
              "[Confirm Page] Error: Verification succeeded but entryData.id was missing in the API response. Data:",
              data
            );
            throw new Error(
              "Verification succeeded but user ID was missing in the response."
            );
          }
        })
        .catch((error) => {
          console.error("Confirmation fetch error:", error);
          setStatus("error");
          setMessage(error.message || "An error occurred during verification.");
          setInitialData(null);
          setEntryId(null);
        });
    } else if (!token && status === "idle") {
      setStatus("error");
      setMessage("Confirmation token is missing.");
      setInitialData(null);
      setEntryId(null);
    }
  }, [token, status]);

  // Log before rendering the survey form if applicable
  if (status === "success" && entryId) {
    console.log("[Confirm Page] Rendering survey form with entryId:", entryId);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-zinc-900">
        {/* Verification Status Messages */}
        {status === "verifying" && (
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Waitlist Confirmation
            </h2>
            <p className="mt-6 text-center text-lg text-gray-600 dark:text-gray-300">
              {message}
            </p>
            {/* Add spinner */}
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Verification Error
            </h2>
            <p className="mt-4 text-lg font-medium text-red-600">Error</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Please try the link again or contact support if the issue
              persists.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-indigo-600 hover:text-indigo-500"
            >
              Return to Homepage
            </Link>
          </div>
        )}

        {/* Show Survey Form on Success, pass entryId */}
        {status === "success" && entryId && (
          <WaitlistSurveyForm entryId={entryId} initialData={initialData} />
        )}
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
