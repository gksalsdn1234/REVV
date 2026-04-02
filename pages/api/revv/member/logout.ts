import type { NextApiRequest, NextApiResponse } from "next";
import { getRevvMemberCookieName } from "../../../../lib/revv-site";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${getRevvMemberCookieName()}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`
  );
  return res.status(200).json({ ok: true });
}
