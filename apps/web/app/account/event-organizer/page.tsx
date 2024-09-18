import { Avatar } from "@/app/components/panel/avatar";
import { Heading, Subheading } from "@/app/components/panel/heading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/panel/table";
import StatisticsSection from "@/app/components/section/statistics/statistics";
import { getRecentOrders } from "@/app/utils/data";
import { getServerSession } from "next-auth";
import { ApplicationLayout } from "../sidebar-layout";

export default async function Home() {
    let orders = await getRecentOrders();
    const session = await getServerSession();

    return (
        <>
            <ApplicationLayout>
                <Heading>Welcome Back, {session?.user?.name}</Heading>
                <StatisticsSection />
                <Subheading className="mt-14">Recent orders</Subheading>
                <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Order number</TableHeader>
                            <TableHeader>Purchase date</TableHeader>
                            <TableHeader>Customer</TableHeader>
                            <TableHeader>Event</TableHeader>
                            <TableHeader className="text-right">Amount</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell className="text-zinc-500">{order.date}</TableCell>
                                <TableCell>{order.customer.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar src={order.event.thumbUrl} className="size-6" />
                                        <span>{order.event.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">US{order.amount.usd}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ApplicationLayout>
        </>
    );
}
