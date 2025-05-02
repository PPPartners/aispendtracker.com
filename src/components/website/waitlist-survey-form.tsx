"use client";

import { useState } from "react";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Assuming you might have/want this from Shadcn for structure
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// --- Constants for options ---
const PROVIDERS = [
  { id: "openai", label: "OpenAI" },
  { id: "anthropic", label: "Anthropic" },
  { id: "google", label: "Google Cloud / Vertex AI" },
  { id: "huggingface", label: "Hugging Face" },
  { id: "perplexity", label: "Perplexity" },
];

const TRACKING_METHODS = [
  "Not tracking yet",
  "Spreadsheet",
  "Finance tool (e.g. QuickBooks, Xero)",
  "Internal scripts",
  "Checking billing pages manually",
];

const TEAM_SIZES = ["Just me", "2–5", "6–15", "16–50", "51+"];

const PRICES = [
  "I'd only use it if it's free",
  "~$19/month",
  "~$99/month",
  "~$299/month",
  "I'm not sure yet",
];

const FEEDBACK_OPTIONS = [
  "Yes – happy to help",
  "Maybe later",
  "Not right now",
];

// --- Zod Schema Definition ---
const surveySchema = z.object({
  building_description: z
    .string()
    .min(1, "Please tell us what you're using AI for.")
    .max(500),
  used_providers: z.array(z.string()).optional(),
  provider_other: z.string().optional(),
  tracking_method: z.string().optional(),
  tracking_other: z.string().optional(),
  billing_frustration: z.string().max(1000).optional(),
  team_size: z.string().optional(),
  reasonable_price: z.string().optional(),
  feedback_call_interest: z.string().optional(),
});

type SurveyFormValues = z.infer<typeof surveySchema>;

// Define shape for fetched entry data (duplicate or import from confirm page)
type EntryData = {
  id?: number;
  confirmed_at?: string | null;
  building_description?: string | null;
  used_providers?: string[] | null;
  tracking_method?: string | null;
  billing_frustration?: string | null;
  team_size?: string | null;
  reasonable_price?: string | null;
  feedback_call_interest?: string | null;
};

// --- Types ---
// Define the shape of data sent to the API (matches DB columns + entryId)
interface SurveyApiPayload {
  entryId: number;
  building_description?: string | null;
  used_providers?: string[] | null;
  tracking_method?: string | null;
  billing_frustration?: string | null;
  team_size?: string | null;
  reasonable_price?: string | null;
  feedback_call_interest?: string | null;
}

// --- Component Props ---
interface WaitlistSurveyFormProps {
  entryId: number;
  initialData?: Partial<EntryData> | null;
}

// --- The Form Component ---
export default function WaitlistSurveyForm({
  entryId,
  initialData,
}: WaitlistSurveyFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Log received entryId prop
  console.log("[Survey Form] Received entryId prop:", entryId);

  const getInitialValue = (
    key: keyof EntryData,
    otherKey: keyof EntryData | null = null
  ): string | string[] => {
    if (!initialData) return key === "used_providers" ? [] : "";
    const value = initialData[key]; // Value could be string | string[] | number | null | undefined here

    if (!value) return key === "used_providers" ? [] : ""; // Handle null/undefined early

    if (otherKey && typeof value === "string" && value.startsWith("Other: ")) {
      return "";
    }
    if (key === "used_providers" && Array.isArray(value)) {
      return value.filter((v: string) => !otherKey || !v.startsWith("Other: "));
    }
    // If not an array, it must be string (or number/bool if schema changed) - return as string
    return typeof value === "string" ? value : String(value); // Convert non-string primitives
  };

  const getInitialOtherValue = (key: keyof EntryData): string => {
    if (!initialData) return "";
    const value = initialData[key];
    if (!value) return ""; // Handle null/undefined

    if (typeof value === "string" && value.startsWith("Other: ")) {
      return value.substring(7);
    }
    if (key === "used_providers" && Array.isArray(value)) {
      const otherEntry = value.find((v: string) => v.startsWith("Other: "));
      return otherEntry ? otherEntry.substring(7) : "";
    }
    return "";
  };

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      building_description: getInitialValue("building_description") as string,
      used_providers: getInitialValue(
        "used_providers",
        "used_providers"
      ) as string[],
      provider_other: getInitialOtherValue("used_providers"),
      tracking_method: getInitialValue(
        "tracking_method",
        "tracking_method"
      ) as string,
      tracking_other: getInitialOtherValue("tracking_method"),
      billing_frustration: getInitialValue("billing_frustration") as string,
      team_size: getInitialValue("team_size") as string,
      reasonable_price: getInitialValue("reasonable_price") as string,
      feedback_call_interest: getInitialValue(
        "feedback_call_interest"
      ) as string,
    },
  });

  async function onSubmit(data: SurveyFormValues) {
    setIsLoading(true);
    setIsSuccess(false);
    setErrorMessage(null);

    const intermediateData = { ...data };

    if (intermediateData.provider_other) {
      intermediateData.used_providers = [
        ...(intermediateData.used_providers || []),
        `Other: ${intermediateData.provider_other}`,
      ];
    }
    const { tracking_other, ...restData } = intermediateData;

    let finalTrackingMethod = restData.tracking_method;
    if (tracking_other) {
      finalTrackingMethod = `Other: ${tracking_other}`;
    }

    const finalPayload: SurveyApiPayload = {
      entryId,
      used_providers:
        restData.used_providers && restData.used_providers.length > 0
          ? restData.used_providers
          : null,
      tracking_method: finalTrackingMethod === "" ? null : finalTrackingMethod,
      building_description:
        restData.building_description === ""
          ? null
          : restData.building_description,
      billing_frustration:
        restData.billing_frustration === ""
          ? null
          : restData.billing_frustration,
      team_size: restData.team_size === "" ? null : restData.team_size,
      reasonable_price:
        restData.reasonable_price === "" ? null : restData.reasonable_price,
      feedback_call_interest:
        restData.feedback_call_interest === ""
          ? null
          : restData.feedback_call_interest,
    };

    // Log the payload before sending
    console.log(
      "[Survey Form] Submitting payload:",
      JSON.stringify(finalPayload, null, 2)
    );

    try {
      const response = await fetch("/api/waitlist/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      });

      if (!response.ok) {
        let errorMsg = "Submission failed. Please try again.";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          /* Ignore parsing error */
        }
        throw new Error(errorMsg);
      }
      setIsSuccess(true);
    } catch (error) {
      console.error("Survey submission error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  // --- Final Success Screen ---
  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-emerald-600">
          🙌 Thanks! You&apos;re all set.
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          We&apos;ll be in touch soon with updates—and you&apos;ll be among the
          first to get access.
        </p>
        {/* Optional: Link back to homepage or somewhere else */}
        {/* <Link href="/" className="inline-block text-indigo-600 hover:text-indigo-500 mt-4">Go to Homepage</Link> */}
      </div>
    );
  }

  // --- Form Rendering ---
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Intro Text */}
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-bold">
            🎉 Thanks for joining the waitlist!
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            We&apos;d love to understand your setup a little better so we can
            shape AI Spend Tracker into something truly useful for you. This
            will take less than 60 seconds.
          </p>
        </div>

        {/* Question 1: Building Description */}
        <FormField
          control={form.control}
          name="building_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. What are you using AI for?</FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g. internal AI tools, SaaS product, chatbot..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Short description is fine!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question 2: Providers */}
        <FormField
          control={form.control}
          name="used_providers"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  2. Which AI providers are you currently using?
                </FormLabel>
                <FormDescription>Select all that apply.</FormDescription>
              </div>
              {PROVIDERS.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="used_providers"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      SurveyFormValues,
                      "used_providers"
                    >;
                  }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              return checked
                                ? field.onChange([...currentValue, item.id])
                                : field.onChange(
                                    currentValue.filter(
                                      (value: string) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              {/* 'Other' Input for Providers */}
              <FormField
                control={form.control}
                name="provider_other"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 mt-2">
                    <FormLabel className="font-normal text-sm whitespace-nowrap">
                      Other:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Provider name(s), please comma-separate them if there are multiple"
                        className="h-8"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question 3: Tracking Method */}
        <FormField
          control={form.control}
          name="tracking_method"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                3. How are you currently tracking your AI costs?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {TRACKING_METHODS.map((method) => (
                    <FormItem
                      key={method}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={method} />
                      </FormControl>
                      <FormLabel className="font-normal">{method}</FormLabel>
                    </FormItem>
                  ))}
                  {/* 'Other' Input for Tracking */}
                  <FormField
                    control={form.control}
                    name="tracking_other"
                    render={({ field: otherField }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-1">
                        <RadioGroupItem value="Other" />
                        <FormLabel className="font-normal whitespace-nowrap">
                          Other:
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...otherField}
                            placeholder="Describe your method"
                            className="h-8"
                            // Select 'Other' radio if this input is focused/typed in
                            onFocus={() =>
                              form.setValue("tracking_method", "Other")
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question 4: Billing Frustration */}
        <FormField
          control={form.control}
          name="billing_frustration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                4. What&apos;s the biggest frustration you&apos;ve had with AI
                billing? (Optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional but helpful – we're listening..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question 5: Team Size */}
        <FormField
          control={form.control}
          name="team_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5. How big is your team?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TEAM_SIZES.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question 6: Reasonable Price */}
        <FormField
          control={form.control}
          name="reasonable_price"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                6. Which pricing tier feels most reasonable for a product that
                helps you avoid unexpected costs and gives full visibility?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {PRICES.map((price) => (
                    <FormItem
                      key={price}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={price} />
                      </FormControl>
                      <FormLabel className="font-normal">{price}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question 7: Feedback Call */}
        <FormField
          control={form.control}
          name="feedback_call_interest"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                7. Would you be open to a quick 15-min call to give feedback?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {FEEDBACK_OPTIONS.map((option) => (
                    <FormItem
                      key={option}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Alert */}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Submitting..." : "Submit Survey"}
        </Button>
      </form>
    </Form>
  );
}
