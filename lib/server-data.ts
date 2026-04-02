import { createServerSupabaseClient } from "./supabase";
import type { RevvMilestone, RevvProgressLog } from "./types";

export async function getRevvMilestones(): Promise<RevvMilestone[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("revv_milestones").select("*").order("order_index", { ascending: true });
  if (error) {
    throw error;
  }
  return (data ?? []) as RevvMilestone[];
}

export async function getRevvProgressLogs(limit = 30): Promise<RevvProgressLog[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("revv_progress_logs").select("*").order("date", { ascending: false }).limit(limit);
  if (error) {
    throw error;
  }
  return (data ?? []) as RevvProgressLog[];
}
