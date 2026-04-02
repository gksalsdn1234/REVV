export interface RevvMilestone {
  id: string;
  title: string;
  description: string | null;
  target_date: string | null;
  completed: boolean;
  completed_at: string | null;
  order_index: number;
}

export interface RevvProgressLog {
  id: string;
  date: string;
  summary: string | null;
  commit_count: number;
  hours_worked: number | null;
  blocker: string | null;
  created_at: string;
}
