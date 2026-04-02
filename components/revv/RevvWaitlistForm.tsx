"use client";

import { useState, useTransition } from "react";

export function RevvWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    startTransition(() => {
      void (async () => {
        const response = await fetch("/api/revv/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });

        if (!response.ok) {
          setStatus("Could not save your email. Try again.");
          return;
        }

        setEmail("");
        setStatus("You’re on the beta radar.");
      })();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-[1fr_auto]">
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="you@roadclub.com"
        className="h-12 rounded-[18px] border border-white/10 bg-white/5 px-4 text-base text-white outline-none placeholder:text-[#94a3c4] focus:border-[#56c2ff]/40"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="h-12 rounded-[18px] border border-[#56c2ff]/35 bg-[#56c2ff]/12 px-5 font-mono text-xs uppercase tracking-[0.28em] text-[#56c2ff] transition hover:bg-[#56c2ff]/18 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Sending" : "Join Waitlist"}
      </button>
      <p className="md:col-span-2 text-sm text-[#94a3c4]">{status || "Prefer to watch first? Join the waitlist and get launch notes."}</p>
    </form>
  );
}
