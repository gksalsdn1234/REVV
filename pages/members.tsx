import type { GetServerSideProps } from "next";
import { RevvMemberHub } from "../components/revv/RevvMemberHub";
import { getRevvCommunityUrl, getRevvFeedbackFormUrl, getRevvPaymentLinkUrl } from "../lib/revv-site";
import { getRevvMilestones, getRevvProgressLogs } from "../lib/server-data";
import type { RevvMilestone, RevvProgressLog } from "../lib/types";

export default function MembersPage({
  milestones,
  logs,
  feedbackLink,
  communityLink,
  paymentLink
}: {
  milestones: RevvMilestone[];
  logs: RevvProgressLog[];
  feedbackLink: string;
  communityLink: string;
  paymentLink: string;
}) {
  return (
    <RevvMemberHub
      milestones={milestones}
      logs={logs}
      feedbackLink={feedbackLink}
      communityLink={communityLink}
      paymentLink={paymentLink}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [milestones, logs] = await Promise.all([getRevvMilestones().catch(() => []), getRevvProgressLogs(30).catch(() => [])]);

  return {
    props: {
      milestones,
      logs,
      feedbackLink: getRevvFeedbackFormUrl(),
      communityLink: getRevvCommunityUrl(),
      paymentLink: getRevvPaymentLinkUrl()
    }
  };
};
