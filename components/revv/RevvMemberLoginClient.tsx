"use client";

import { useState, useTransition } from "react";

export function RevvMemberLoginClient({ nextPath }: { nextPath: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    startTransition(() => {
      void (async () => {
        const response = await fetch("/api/revv/member/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password })
        });

        if (!response.ok) {
          setError("멤버 액세스 코드가 맞지 않습니다.");
          return;
        }

        window.location.href = nextPath;
      })();
    });
  }

  return (
    <section className="w-full max-w-md rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,28,0.94),rgba(7,10,20,0.88))] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-[#56c2ff]">Founding Beta</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">Members Access</h1>
      <p className="mt-3 text-sm leading-7 text-[#94a3c4]">
        결제 후 받은 멤버 액세스 코드로 전용 로드맵과 베타 허브에 들어올 수 있습니다.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Member access code"
          className="h-12 w-full rounded-[18px] border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-[#7084a7] focus:border-[#56c2ff]/40"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-[18px] border border-[#56c2ff]/35 bg-[#56c2ff]/14 px-5 font-mono text-sm uppercase tracking-[0.24em] text-[#56c2ff] transition hover:bg-[#56c2ff]/18 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Unlocking" : "Unlock Members Hub"}
        </button>
      </form>

      <p className="mt-4 text-sm text-[#ff9ba7]">{error}</p>
    </section>
  );
}
