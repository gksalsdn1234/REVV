import Link from "next/link";
import type { GetServerSideProps } from "next";
import { getRevvPaymentLinkUrl } from "../lib/revv-site";

export default function SuccessPage({ paymentLink }: { paymentLink: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,18,32,0.96),rgba(7,10,20,0.9))] p-8 text-white shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-[#56c2ff]">Founding Beta</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">You’re almost inside.</h1>
        <p className="mt-4 text-base leading-8 text-[#a8b6cf]">
          After checkout, use your member access code to unlock the private roadmap and beta hub. If you have not received your access details yet, keep this page handy and follow up through your onboarding channel.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link href="/members/login" className="inline-flex h-12 items-center justify-center rounded-full border border-[#56c2ff]/35 bg-[#56c2ff]/14 px-5 font-mono text-xs uppercase tracking-[0.28em] text-[#56c2ff] transition hover:bg-[#56c2ff]/20">
            Unlock Members Hub
          </Link>
          <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 font-mono text-xs uppercase tracking-[0.28em] text-white transition hover:border-white/20 hover:bg-white/[0.08]">
            Back to REVV
          </Link>
        </div>
        {paymentLink ? (
          <a href={paymentLink} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm text-[#94cfff]">
            Need to reopen checkout?
          </a>
        ) : null}
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      paymentLink: getRevvPaymentLinkUrl()
    }
  };
};
