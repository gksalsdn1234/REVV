import type { GetServerSideProps } from "next";
import { RevvMemberLoginClient } from "../../components/revv/RevvMemberLoginClient";

export default function MembersLoginPage({ nextPath }: { nextPath: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <RevvMemberLoginClient nextPath={nextPath} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{ nextPath: string }> = async (context) => {
  const nextPath = typeof context.query.next === "string" ? context.query.next : "/members";
  return {
    props: {
      nextPath
    }
  };
};
