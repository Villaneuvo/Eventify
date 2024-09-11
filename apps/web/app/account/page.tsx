"use client";

import { useSession } from "next-auth/react";

const UserAccountPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>
        Hello {session?.user?.name} - {JSON.stringify(session)}
      </p>
    </div>
  );
};

export default UserAccountPage;
