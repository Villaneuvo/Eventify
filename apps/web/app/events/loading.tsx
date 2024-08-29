import { Skeleton } from "@/app/components";
import { Table } from "@radix-ui/themes";
import EventAction from "./EventAction";

const EventLoadingPage = () => {
    const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div>
            <EventAction />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Event Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Genre</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Location</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {events.map((event) => (
                        <Table.Row key={event}>
                            <Table.Cell>
                                <Skeleton />
                                <div className="block md:hidden">
                                    <Skeleton />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default EventLoadingPage;
