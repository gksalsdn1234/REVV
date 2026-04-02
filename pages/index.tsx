import type { GetServerSideProps } from "next";
import { RevvPublicSite } from "../components/revv/RevvPublicSite";
import { getRevvCommunityUrl, getRevvFeedbackFormUrl, getRevvPaymentLinkUrl, buildPublicProof } from "../lib/revv-site";
import { getRevvMilestones, getRevvProgressLogs } from "../lib/server-data";
import type { RevvMilestone, RevvProgressLog } from "../lib/types";

export default function HomePage({
  milestones,
  logs,
  paymentLink,
  feedbackLink,
  communityLink
}: {
  milestones: RevvMilestone[];
  logs: RevvProgressLog[];
  paymentLink: string;
  feedbackLink: string;
  communityLink: string;
}) {
  return (
    <RevvPublicSite
      milestones={milestones}
      logs={logs}
      proof={buildPublicProof({ milestones, logs })}
      paymentLink={paymentLink}
      feedbackLink={feedbackLink}
      communityLink={communityLink}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [milestones, logs] = await Promise.all([getRevvMilestones().catch(() => []), getRevvProgressLogs(8).catch(() => [])]);

  return {
    props: {
      milestones,
      logs,
      paymentLink: getRevvPaymentLinkUrl(),
      feedbackLink: getRevvFeedbackFormUrl(),
      communityLink: getRevvCommunityUrl()
    }
  };
};
