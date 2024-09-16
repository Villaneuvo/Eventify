"use client";

import BecomeOrganizer from "@/app/components/section/become-organizer/organizer";
import CreateEvent from "@/app/components/section/create-event/create-event";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    const role = session?.user?.role;

    return (
        <>
            {role === "ATTENDEE" ? (
                <BecomeOrganizer />
            ) : role === "ORGANIZER" || role === "ADMIN" ? (
                <CreateEvent />
            ) : (
                <p>APA MAS</p>
            )}
        </>
    );
}
