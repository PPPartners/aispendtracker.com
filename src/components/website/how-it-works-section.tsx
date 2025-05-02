import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
            <span className="font-semibold">How It Works</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Setup in Minutes, Not Days
          </h2>
          <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            Get started with just a few clicks and see your AI spend data
            instantly.
          </p>
        </div>
        <div className="mx-auto max-w-5xl py-12">
          <Tabs defaultValue="visualize" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="connect">1. Connect</TabsTrigger>
              <TabsTrigger value="visualize">2. Visualize</TabsTrigger>
              <TabsTrigger value="optimize">3. Optimize</TabsTrigger>
            </TabsList>
            <TabsContent value="connect" className="mt-6 space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-2xl font-bold">
                    Connect Your AI Services
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Simply provide read-only API keys for services like OpenAI,
                    Anthropic, and others. For services without direct API
                    access, upload CSV or JSON exports.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Secure, read-only connections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Auto-detection of billing data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Support for all major AI providers</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center rounded-lg border bg-zinc-100 p-8 dark:bg-zinc-800">
                  <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-950">
                    <h4 className="text-lg font-medium">Connect API Service</h4>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Select Provider
                      </label>
                      <select className="w-full rounded-md border border-zinc-200 p-2 text-sm dark:border-zinc-800">
                        <option>OpenAI</option>
                        <option>Anthropic</option>
                        <option>Google AI</option>
                        <option>Hugging Face</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        API Key (read-only)
                      </label>
                      <input
                        type="password"
                        placeholder="sk-••••••••••••••••••••••"
                        className="w-full rounded-md border border-zinc-200 p-2 text-sm dark:border-zinc-800"
                      />
                      <p className="text-xs text-zinc-500">
                        We only store encrypted read-only keys
                      </p>
                    </div>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Connect Service
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="visualize" className="mt-6 space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-2xl font-bold">
                    Visualize Your Spending
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Once connected, your data is automatically processed and
                    displayed in intuitive charts and graphs. See spending
                    trends, breakdowns by service, and more.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Interactive dashboards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Historical trend analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Customizable views and filters</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center rounded-lg border bg-zinc-100 p-4 dark:bg-zinc-800">
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-[3fr_2fr] gap-4">
                      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-950">
                        <h5 className="text-sm font-medium">
                          Spend by Provider
                        </h5>
                        <div className="mt-2 h-[150px] w-full">
                          {/* Placeholder Bar Chart */}
                          <div className="flex h-full gap-2 items-end">
                            <div className="flex-1 text-center ">
                              <div className=" mx-auto rounded-t bg-blue-500 h-[100px] w-[40px]"></div>
                              <span className="mt-1 text-xs">OpenAI</span>
                            </div>

                            <div className="flex-1 text-center ">
                              <div className=" mx-auto rounded-t bg-purple-500 h-[40px] w-[40px]"></div>
                              <span className="mt-1 text-xs">Anthropic</span>
                            </div>

                            <div className="flex-1 text-center">
                              <div className=" mx-auto rounded-t bg-amber-500 h-[60px] w-[40px]"></div>
                              <span className="mt-1 text-xs">Google</span>
                            </div>

                            <div className="flex-1 text-center">
                              <div className=" mx-auto rounded-t bg-emerald-500 h-[20px] w-[40px]"></div>
                              <span className="mt-1 text-xs">Other</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-950">
                        <h5 className="text-sm font-medium">
                          Spend by Project
                        </h5>
                        <div className="mt-4 space-y-2">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Project Alpha</span>
                              <span>$450</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                              <div
                                className="h-2 rounded-full bg-emerald-500"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Chatbot</span>
                              <span>$320</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                              <div
                                className="h-2 rounded-full bg-emerald-500"
                                style={{ width: "32%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Image Gen</span>
                              <span>$230</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                              <div
                                className="h-2 rounded-full bg-emerald-500"
                                style={{ width: "23%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-950">
                      <h5 className="text-sm font-medium">Daily Spend Trend</h5>
                      <div className="mt-2 h-[100px] w-full">
                        {/* Placeholder Bar Chart */}
                        <div className="flex h-full items-end gap-1">
                          {[
                            30, 45, 25, 60, 40, 35, 55, 50, 70, 65, 80, 75, 85,
                            90, 88, 78, 68, 58, 48, 38,
                          ].map((height, i) => (
                            <div key={i} className="relative flex-1 h-full">
                              <div
                                className="absolute bottom-0 w-full rounded-sm bg-emerald-500 min-h-[2px]"
                                style={{ height: `${height}%` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="optimize" className="mt-6 space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-2xl font-bold">Optimize Your AI Spend</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Set budgets, receive alerts, and make data-driven decisions
                    to optimize your AI spending and prevent unexpected costs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Set monthly or project-based budgets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Receive alerts when approaching limits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Identify cost-saving opportunities</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center rounded-lg border bg-zinc-100 p-8 dark:bg-zinc-800">
                  <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-950">
                    <h4 className="text-lg font-medium">Budget Settings</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Monthly Budget
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
                            $
                          </span>
                          <input
                            type="number"
                            placeholder="2000"
                            className="w-full rounded-r-md border border-zinc-200 p-2 text-sm dark:border-zinc-800"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Alert Thresholds
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="alert75"
                              className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
                            />
                            <label htmlFor="alert75" className="text-sm">
                              Alert at 75% of budget
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="alert90"
                              className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
                            />
                            <label htmlFor="alert90" className="text-sm">
                              Alert at 90% of budget
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="alert100"
                              className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
                            />
                            <label htmlFor="alert100" className="text-sm">
                              Alert at 100% of budget
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Notification Method
                        </label>
                        <select className="w-full rounded-md border border-zinc-200 p-2 text-sm dark:border-zinc-800">
                          <option>Email</option>
                          <option>Slack</option>
                          <option>Discord</option>
                          <option>All of the above</option>
                        </select>
                      </div>
                    </div>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Save Budget Settings
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
