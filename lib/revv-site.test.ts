import test from "node:test";
import assert from "node:assert/strict";
import { buildPublicProof, hasValidRevvMemberSessionValue } from "./revv-site";
import type { RevvMilestone, RevvProgressLog } from "./types";

function milestone(partial: Partial<RevvMilestone>): RevvMilestone {
  return {
    id: partial.id || "milestone",
    title: partial.title || "Milestone",
    description: partial.description ?? null,
    target_date: partial.target_date ?? null,
    completed: partial.completed ?? false,
    completed_at: partial.completed_at ?? null,
    order_index: partial.order_index ?? 0
  };
}

function log(partial: Partial<RevvProgressLog>): RevvProgressLog {
  return {
    id: partial.id || "log",
    date: partial.date || "2026-04-01",
    summary: partial.summary ?? null,
    commit_count: partial.commit_count ?? 0,
    hours_worked: partial.hours_worked ?? null,
    blocker: partial.blocker ?? null,
    created_at: partial.created_at || "2026-04-01T00:00:00.000Z"
  };
}

test("buildPublicProof returns counts and only the most recent highlights", () => {
  const proof = buildPublicProof({
    milestones: [
      milestone({ id: "1", title: "Curvature scoring", completed: true, order_index: 1 }),
      milestone({ id: "2", title: "OBD2 integration", completed: false, order_index: 2 }),
      milestone({ id: "3", title: "TestFlight beta", completed: false, order_index: 3 })
    ],
    logs: [
      log({ id: "l1", date: "2026-04-01", summary: "Added route replay", commit_count: 6 }),
      log({ id: "l2", date: "2026-03-31", summary: "Refined OBD cards", commit_count: 4 }),
      log({ id: "l3", date: "2026-03-29", summary: "Polished sprint HUD", commit_count: 2 })
    ]
  });

  assert.equal(proof.progressRate, 33);
  assert.equal(proof.completedMilestones, 1);
  assert.equal(proof.totalMilestones, 3);
  assert.equal(proof.nextMilestone?.title, "OBD2 integration");
  assert.deepEqual(
    proof.highlights.map((item) => item.summary),
    ["Added route replay", "Refined OBD cards"]
  );
});

test("buildPublicProof keeps latest blocker note when present", () => {
  const proof = buildPublicProof({
    milestones: [milestone({ completed: false, title: "Next item", order_index: 1 })],
    logs: [
      log({ date: "2026-04-01", summary: "Prep", blocker: "Need real-road testing" }),
      log({ date: "2026-03-31", summary: "Older update", blocker: null })
    ]
  });

  assert.equal(proof.latestBlocker, "Need real-road testing");
});

test("member session validation matches the configured password", () => {
  process.env.REVV_MEMBER_ACCESS_PASSWORD = "revv-secret";

  assert.equal(hasValidRevvMemberSessionValue("revv-secret"), true);
  assert.equal(hasValidRevvMemberSessionValue("wrong-secret"), false);
  assert.equal(hasValidRevvMemberSessionValue(undefined), false);
});
