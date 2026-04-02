import type { NextApiRequest, NextApiResponse } from "next";
import { getRevvMemberCookieName, getRevvMemberPassword } from "../../../../lib/revv-site";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "method not allowed" });
    }

    const { password } = req.body as { password?: string };
    if (!password || password !== getRevvMemberPassword()) {
      return res.status(401).json({ error: "invalid password" });
    }

    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.setHeader(
      "Set-Cookie",
      `${getRevvMemberCookieName()}=${encodeURIComponent(password)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${secure}`
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "member login failed" });
  }
}
