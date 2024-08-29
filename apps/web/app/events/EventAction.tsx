import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EventAction = () => {
    return (
        <div className="mb-5">
            <Button>
                <Link href="/event/new">New Event</Link>
            </Button>
        </div>
    );
};

export default EventAction;
