import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "../../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "method not allowed" });
    }

    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "valid email is required" });
    }

    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("revv_waitlist").upsert({ email }, { onConflict: "email", ignoreDuplicates: false });
    if (error) {
      throw error;
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "waitlist signup failed" });
  }
}
