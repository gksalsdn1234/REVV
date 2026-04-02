"use client";

import { useTransition } from "react";
import type { RevvMilestone, RevvProgressLog } from "../../lib/types";

function statusLabel(item: RevvMilestone) {
  if (item.completed) return "Shipped";
  if (item.target_date) return `Target ${item.target_date}`;
  return "Queued";
}

export function RevvMemberHub({
  milestones,
  logs,
  feedbackLink,
  communityLink,
  paymentLink
}: {
  milestones: RevvMilestone[];
  logs: RevvProgressLog[];
  feedbackLink: string;
  communityLink: string;
  paymentLink: string;
}) {
  const [isPending, startTransition] = useTransition();
  const nextMilestone = milestones.find((item) => !item.completed) ?? null;

  function handleLogout() {
    startTransition(() => {
      void (async () => {
        await fetch("/api/revv/member/logout", { method: "POST" });
        window.location.href = "/";
      })();
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(86,194,255,0.16),transparent_24%),radial-gradient(circle_at_12%_0%,rgba(255,107,127,0.14),transparent_24%),linear-gradient(180deg,#04070f_0%,#060812_38%,#090d16_100%)] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,20,36,0.96),rgba(8,12,23,0.9))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.34)] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-[#56c2ff]">Members Hub</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">REVV Founding Beta</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#aec0dc]">
                This is the private side of the project: live milestones, build notes, beta direction, and the current shipping rhythm.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {communityLink ? (
                <a
                  href={communityLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-[#dfe8f5] transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  Community
                </a>
              ) : null}
              {feedbackLink ? (
                <a
                  href={feedbackLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-[#dfe8f5] transition hover:border-white/20 hover:bg-white/[0.08]"
                >
                  Submit Feedback
                </a>
              ) : null}
              {paymentLink ? (
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#56c2ff]/30 bg-[#56c2ff]/12 px-5 font-mono text-xs uppercase tracking-[0.24em] text-[#56c2ff] transition hover:bg-[#56c2ff]/18"
                >
                  Manage Beta
                </a>
              ) : null}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isPending}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-[#dfe8f5] transition hover:border-white/20 hover:bg-white/[0.08] disabled:opacity-60"
              >
                {isPending ? "Leaving" : "Log out"}
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#94a3c4]">Next up</p>
              <p className="mt-3 text-2xl font-semibold">{nextMilestone?.title || "More route intelligence"}</p>
              <p className="mt-3 text-sm leading-7 text-[#b5c2d8]">{nextMilestone?.description || "The next milestone is being refined inside the build queue."}</p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#94a3c4]">Shipping rhythm</p>
              <p className="mt-3 text-2xl font-semibold">{logs.length} tracked updates</p>
              <p className="mt-3 text-sm leading-7 text-[#b5c2d8]">Recent logs stay visible here so members can see what changed without digging through commits.</p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#94a3c4]">Members value</p>
              <p className="mt-3 text-2xl font-semibold">Closer than public</p>
              <p className="mt-3 text-sm leading-7 text-[#b5c2d8]">Use the beta early, track the real roadmap, and help shape the next stretch of the product.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,17,31,0.96),rgba(7,10,19,0.9))] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#56c2ff]">Roadmap</p>
            <div className="mt-6 grid gap-4">
              {milestones.map((item) => (
                <article key={item.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xl font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#b5c2d8]">{item.description || "Detailed scope is still tightening around this milestone."}</p>
                    </div>
                    <span className={`inline-flex rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em] ${
                      item.completed
                        ? "border-[#47f0a1]/25 bg-[#47f0a1]/10 text-[#47f0a1]"
                        : "border-[#56c2ff]/20 bg-[#56c2ff]/10 text-[#56c2ff]"
                    }`}>
                      {statusLabel(item)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,17,31,0.96),rgba(7,10,19,0.9))] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#ff8ea0]">Build Log</p>
            <div className="mt-6 space-y-4">
              {logs.map((item) => (
                <article key={item.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#94a3c4]">
                    <span>{item.date}</span>
                    <span>{item.commit_count} commits</span>
                    {item.hours_worked ? <span>{item.hours_worked}h tracked</span> : null}
                  </div>
                  <p className="mt-3 text-lg font-semibold">{item.summary || "Development update"}</p>
                  {item.blocker ? <p className="mt-3 text-sm leading-7 text-[#ff9ba7]">Blocker: {item.blocker}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
