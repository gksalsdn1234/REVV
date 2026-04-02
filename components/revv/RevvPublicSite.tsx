import Link from "next/link";
import type { RevvMilestone, RevvProgressLog } from "../../lib/types";
import type { RevvPublicProof } from "../../lib/revv-site";
import { RevvWaitlistForm } from "./RevvWaitlistForm";

const demoRoutes = [
  {
    title: "North Ridge Escape",
    distance: "94 km",
    mood: "Fast sweepers + lake edges",
    score: "91 / 100",
    note: "Curvature density stays high without turning into a stop-and-go loop."
  },
  {
    title: "Laurentian Twist Loop",
    distance: "128 km",
    mood: "Climbs, descents, viewpoint stops",
    score: "88 / 100",
    note: "Built for a half-day Saturday drive with enough rhythm to stay memorable."
  },
  {
    title: "Sunset Return Run",
    distance: "76 km",
    mood: "Short blast with a clean return line",
    score: "84 / 100",
    note: "For drivers who want one focused run instead of an all-day plan."
  }
] as const;

const reportSignals = [
  { label: "Drive mode split", value: "Winding 54%", note: "How much of the session felt alive instead of flat." },
  { label: "Peak lateral G", value: "0.71g", note: "A session-level feel check, not just a speed number." },
  { label: "Throttle rhythm", value: "Clean exits", note: "Turns raw OBD data into something easier to read." }
] as const;

const faqItems = [
  {
    question: "Is REVV a normal navigation app?",
    answer: "No. It is being shaped for drivers who care about the quality of the drive, not just the fastest route."
  },
  {
    question: "Why is the roadmap members-only?",
    answer: "Founding members get a closer view of what is shipping next, what is blocked, and how feedback is changing the build."
  },
  {
    question: "What do I get after paying?",
    answer: "Members get beta access, premium route recommendations, insider updates, and access to the live build roadmap."
  },
  {
    question: "Does REVV encourage reckless driving?",
    answer: "No. Messaging and product framing stay focused on road sense, route quality, and post-drive insight."
  }
] as const;

function formatMilestoneBadge(milestone: RevvMilestone) {
  if (milestone.completed) return "Complete";
  if (milestone.target_date) return `Target ${milestone.target_date}`;
  return "In build";
}

export function RevvPublicSite({
  proof,
  milestones,
  logs,
  paymentLink,
  feedbackLink,
  communityLink
}: {
  proof: RevvPublicProof;
  milestones: RevvMilestone[];
  logs: RevvProgressLog[];
  paymentLink: string;
  feedbackLink: string;
  communityLink: string;
}) {
  const offerHref = paymentLink || "#waitlist";
  const proofMilestones = milestones.slice(0, 3);
  const teaserLogs = logs.slice(0, 3);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,88,122,0.14),transparent_24%),radial-gradient(circle_at_80%_0%,rgba(86,194,255,0.18),transparent_22%),linear-gradient(180deg,#05070f_0%,#060812_42%,#090d16_100%)] text-white">
      <section className="relative overflow-hidden px-4 pb-16 pt-6 md:px-8 md:pb-24 md:pt-8">
        <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,92,128,0.24),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(86,194,255,0.2),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl">
          <header className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl md:px-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#56c2ff]">REVV</p>
              <p className="mt-1 text-sm text-[#9fb0cb]">Founding beta for weekend drivers</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#c7d3ea]">
              <a href="#demo" className="rounded-full border border-white/10 px-3 py-2 transition hover:border-[#56c2ff]/30 hover:text-white">
                Demo
              </a>
              <a href="#offer" className="rounded-full border border-[#56c2ff]/30 bg-[#56c2ff]/12 px-3 py-2 font-mono uppercase tracking-[0.2em] text-[#56c2ff] transition hover:bg-[#56c2ff]/18">
                Join Beta
              </a>
            </div>
          </header>

          <div className="grid gap-12 pb-14 pt-12 md:pt-20 xl:grid-cols-[minmax(0,1.1fr)_420px] xl:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-[#ff8ea0]">Weekend drive intelligence</p>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
                Find a drive worth leaving the city for.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#a8b6cf] md:text-lg">
                REVV is building a premium route-and-run layer for drivers who care about winding roads, clean post-drive insight, and a better reason to go out on Saturday.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#demo"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/6 px-6 font-mono text-xs uppercase tracking-[0.28em] text-white transition hover:border-white/24 hover:bg-white/10"
                >
                  See the Demo
                </a>
                <a
                  href={offerHref}
                  target={paymentLink ? "_blank" : undefined}
                  rel={paymentLink ? "noreferrer" : undefined}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#56c2ff]/35 bg-[#56c2ff]/14 px-6 font-mono text-xs uppercase tracking-[0.28em] text-[#56c2ff] transition hover:bg-[#56c2ff]/20"
                >
                  Join Founding Beta
                </a>
              </div>

              <div className="mt-10 grid gap-3 text-sm text-[#dfe8f5] md:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#94a3c4]">Progress</p>
                  <p className="mt-2 text-3xl font-semibold">{proof.progressRate}%</p>
                  <p className="mt-2 text-[#a8b6cf]">{proof.completedMilestones}/{proof.totalMilestones} major milestones shipped.</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#94a3c4]">Next unlock</p>
                  <p className="mt-2 text-lg font-semibold">{proof.nextMilestone?.title || "More route intelligence"}</p>
                  <p className="mt-2 text-[#a8b6cf]">Members track the detailed roadmap behind this milestone.</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#94a3c4]">Latest blocker</p>
                  <p className="mt-2 text-lg font-semibold">{proof.latestBlocker || "No public blockers right now"}</p>
                  <p className="mt-2 text-[#a8b6cf]">Founding members see the live dev log behind the scenes.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,19,35,0.96),rgba(8,11,21,0.92))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
              <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,95,130,0.16),transparent_32%),rgba(255,255,255,0.03)] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff8ea0]">Sample session</p>
                    <h2 className="mt-2 text-2xl font-semibold">Laurentian dusk run</h2>
                  </div>
                  <span className="rounded-full border border-[#56c2ff]/20 bg-[#56c2ff]/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#56c2ff]">
                    Scenic + Winding
                  </span>
                </div>

                <div className="mt-6 rounded-[26px] border border-white/10 bg-[#08101d]/85 p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#94a3c4]">Route score</p>
                      <p className="mt-2 text-4xl font-semibold">88</p>
                    </div>
                    <div className="max-w-[180px] text-right text-sm leading-6 text-[#a8b6cf]">
                      Enough elevation, enough rhythm, not too much traffic.
                    </div>
                  </div>

                  <div className="mt-5 h-40 rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(10,18,35,0.92),rgba(18,28,52,0.88))] p-4">
                    <div className="relative h-full overflow-hidden rounded-[16px] bg-[radial-gradient(circle_at_20%_20%,rgba(86,194,255,0.18),transparent_22%),radial-gradient(circle_at_72%_30%,rgba(255,94,129,0.18),transparent_20%),linear-gradient(180deg,rgba(11,16,29,0.95),rgba(8,11,20,0.85))]">
                      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_36px,36px_100%]" />
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 160" fill="none" aria-hidden="true">
                        <path d="M24 123C52 120 68 54 110 52C140 50 148 108 184 106C228 103 240 34 286 36C322 38 340 118 376 116" stroke="url(#route)" strokeWidth="10" strokeLinecap="round" />
                        <circle cx="24" cy="123" r="6" fill="#47f0a1" />
                        <circle cx="376" cy="116" r="6" fill="#ff6b7f" />
                        <defs>
                          <linearGradient id="route" x1="24" y1="123" x2="376" y2="116" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#47f0a1" />
                            <stop offset="0.45" stopColor="#56c2ff" />
                            <stop offset="1" stopColor="#ff6b7f" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {reportSignals.map((signal) => (
                    <div key={signal.label} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#94a3c4]">{signal.label}</p>
                      <p className="mt-2 text-xl font-semibold">{signal.value}</p>
                      <p className="mt-2 text-sm leading-6 text-[#a8b6cf]">{signal.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section id="demo" className="grid gap-6 py-10 xl:grid-cols-[minmax(0,1.1fr)_320px]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#56c2ff]">Interactive Demo</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">Taste the drive before you pay for the real one.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#a8b6cf]">
                The public site shows what a high-quality route looks like. Founding members unlock live recommendations, private build notes, and the beta app itself.
              </p>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {demoRoutes.map((route) => (
                  <article key={route.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#56c2ff]/28 hover:bg-white/[0.05]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#94a3c4]">{route.distance}</p>
                      <span className="rounded-full border border-[#56c2ff]/18 bg-[#56c2ff]/10 px-3 py-1 text-xs text-[#56c2ff]">{route.score}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{route.title}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[#ff8ea0]">{route.mood}</p>
                    <p className="mt-4 text-sm leading-7 text-[#b5c2d8]">{route.note}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,26,0.96),rgba(6,9,18,0.9))] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff8ea0]">Why it feels different</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#b5c2d8]">
                <p>Normal maps optimize for arrival. REVV optimizes for the quality of the drive itself.</p>
                <p>Instead of just distance and ETA, the route layer weighs curvature, rhythm, elevation, and how satisfying the full session feels.</p>
                <p>The result is a route picker that behaves more like a driving buddy than a generic map search.</p>
              </div>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#94a3c4]">Members unlock</p>
                <ul className="mt-3 space-y-3 text-sm text-[#dce6f6]">
                  <li>Live route recommendations around your area</li>
                  <li>Private roadmap and shipping notes</li>
                  <li>Beta app access and insider updates</li>
                </ul>
              </div>
            </aside>
          </section>

          <section className="grid gap-6 py-10 xl:grid-cols-[320px_minmax(0,1fr)]">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#56c2ff]">Build Proof</p>
              <p className="mt-4 text-4xl font-semibold">{proof.progressRate}%</p>
              <p className="mt-3 text-sm leading-7 text-[#a8b6cf]">
                The public site only shows a distilled proof layer. Full milestones, blockers, and dev logs live inside the members hub.
              </p>
              <div className="mt-6 h-3 rounded-full bg-[#08101d]">
                <div className="h-3 rounded-full bg-[linear-gradient(90deg,#ff6b7f_0%,#56c2ff_55%,#47f0a1_100%)]" style={{ width: `${proof.progressRate}%` }} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {proofMilestones.map((item) => (
                <article key={item.id} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#94a3c4]">{formatMilestoneBadge(item)}</p>
                  <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#b5c2d8]">{item.description || "Detailed scope stays inside the members roadmap."}</p>
                </article>
              ))}
              {teaserLogs.map((item) => (
                <article key={item.id} className="rounded-[28px] border border-dashed border-white/14 bg-[rgba(255,255,255,0.02)] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#ff8ea0]">{item.date}</p>
                  <h3 className="mt-3 text-lg font-semibold">{item.summary || "Development update"}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#b5c2d8]">
                    {item.blocker ? `Public note: ${item.blocker}` : "Members see full notes, blockers, and the next shipping sequence."}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="offer" className="grid gap-6 py-10 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#56c2ff]">Founding Beta</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">A small membership for drivers who want in early.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#a8b6cf]">
                This is not a giant public launch. It is a paid founding layer for people who want beta access, premium route intelligence, and a front-row seat to the build.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  "Premium route picks, not generic map output",
                  "Members-only roadmap and build notes",
                  "Beta access as the app sharpens",
                  "Feedback channel with direct influence"
                ].map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-[#dce6f6]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[34px] border border-[#56c2ff]/20 bg-[linear-gradient(180deg,rgba(16,25,44,0.98),rgba(8,13,25,0.94))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#56c2ff]">REVV Founding Beta</p>
              <div className="mt-4 flex items-end gap-2">
                <p className="text-5xl font-semibold tracking-[-0.05em]">CAD 9</p>
                <p className="pb-2 text-sm uppercase tracking-[0.24em] text-[#94a3c4]">/ month</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#b5c2d8]">
                Use the beta early, unlock the members hub, and help shape what ships next.
              </p>

              <div className="mt-6 space-y-3 text-sm text-[#dce6f6]">
                <p>Beta app access</p>
                <p>Premium route recommendations</p>
                <p>Members-only roadmap and dev log</p>
                <p>Insider updates and feedback loop</p>
              </div>

              <a
                href={offerHref}
                target={paymentLink ? "_blank" : undefined}
                rel={paymentLink ? "noreferrer" : undefined}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-[#56c2ff]/35 bg-[#56c2ff]/14 px-5 font-mono text-xs uppercase tracking-[0.28em] text-[#56c2ff] transition hover:bg-[#56c2ff]/20"
              >
                {paymentLink ? "Join Founding Beta" : "Join Waitlist Instead"}
              </a>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#94a3c4]">
                <Link href="/members/login" className="transition hover:text-white">
                  Already a member?
                </Link>
                {communityLink ? (
                  <a href={communityLink} target="_blank" rel="noreferrer" className="transition hover:text-white">
                    Community
                  </a>
                ) : null}
                {feedbackLink ? (
                  <a href={feedbackLink} target="_blank" rel="noreferrer" className="transition hover:text-white">
                    Feedback
                  </a>
                ) : null}
              </div>
            </aside>
          </section>

          <section id="waitlist" className="grid gap-6 py-10 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#ff8ea0]">Follow the build</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">Not ready to pay yet? Stay close to the build.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#a8b6cf]">
                Watch the project, get launch updates, and jump in when the beta timing feels right. This keeps the public side open without exposing the full members roadmap.
              </p>
              <div className="mt-8">
                <RevvWaitlistForm />
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#56c2ff]">What members see inside</p>
              <div className="mt-5 space-y-3">
                {proof.highlights.map((item) => (
                  <div key={item.id} className="rounded-[20px] border border-white/10 bg-[#08101d]/70 px-4 py-4">
                    <p className="text-sm text-[#94a3c4]">{item.date}</p>
                    <p className="mt-2 text-base font-medium">{item.summary}</p>
                    <p className="mt-2 text-sm text-[#b5c2d8]">{item.commitCount} commits in this update window.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#56c2ff]">FAQ</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#b5c2d8]">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
