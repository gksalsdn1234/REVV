import { requireEnv } from "./config";
import type { RevvMilestone, RevvProgressLog } from "./types";

export interface RevvPublicHighlight {
  id: string;
  date: string;
  summary: string;
  commitCount: number;
}

export interface RevvPublicProof {
  progressRate: number;
  completedMilestones: number;
  totalMilestones: number;
  nextMilestone: RevvMilestone | null;
  latestBlocker: string | null;
  highlights: RevvPublicHighlight[];
}

export function getRevvMemberPassword() {
  return requireEnv("REVV_MEMBER_ACCESS_PASSWORD");
}

export function getRevvMemberCookieName() {
  return "revv_member_session";
}

export function hasValidRevvMemberSessionValue(value?: string) {
  return Boolean(value) && value === getRevvMemberPassword();
}

export function getRevvPaymentLinkUrl() {
  return process.env.REVV_PAYMENT_LINK_URL?.trim() || "";
}

export function getRevvFeedbackFormUrl() {
  return process.env.REVV_FEEDBACK_FORM_URL?.trim() || "";
}

export function getRevvCommunityUrl() {
  return process.env.REVV_COMMUNITY_URL?.trim() || "";
}

export function buildPublicProof({
  milestones,
  logs
}: {
  milestones: RevvMilestone[];
  logs: RevvProgressLog[];
}): RevvPublicProof {
  const completedMilestones = milestones.filter((item) => item.completed).length;
  const totalMilestones = milestones.length;
  const progressRate = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
  const nextMilestone = milestones.find((item) => !item.completed) ?? null;
  const latestBlocker = logs.find((item) => item.blocker)?.blocker || null;
  const highlights = logs.slice(0, 2).map((item) => ({
    id: item.id,
    date: item.date,
    summary: item.summary || "Development update",
    commitCount: item.commit_count
  }));

  return {
    progressRate,
    completedMilestones,
    totalMilestones,
    nextMilestone,
    latestBlocker,
    highlights
  };
}
