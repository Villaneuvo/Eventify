"use client";

import { Heading } from "@/app/components/panel/heading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/panel/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ApplicationLayout } from "../sidebar-layout";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

export interface Transaction {
    id: string;
    amount: number;
    createdAt: string;
    tickets: object[];
    promotion?: {
        code: string;
    } | null;
}

export default function Page() {
    const { data: session } = useSession();

    const {
        data: transactions,
        error,
        isLoading,
    } = useQuery<Transaction[]>({
        queryKey: ["transactions"],
        queryFn: () =>
            axios
                .get(`${BASE_URL}/api/v1/transaction/users/${session?.user.id}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.token}`,
                    },
                })
                .then((res) => res.data),
        enabled: !!session,
    });

    if (!session) return null;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching transactions</div>;

    return (
        <ApplicationLayout>
            <div className="flex items-end justify-between gap-4">
                <Heading>Transactions</Heading>
            </div>
            <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
                <TableHead>
                    <TableRow>
                        <TableHeader className="text-left">Transaction ID</TableHeader>
                        <TableHeader className="text-center">Purchase Date</TableHeader>
                        <TableHeader className="text-center">Tickets</TableHeader>
                        <TableHeader className="text-center">Promotion</TableHeader>
                        <TableHeader className="text-right">Amount</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions?.map((transaction) => (
                        <TableRow
                            key={transaction.id}
                            href={"/transaction/" + transaction.id}
                            title={`Transaction #${transaction.id}`}
                        >
                            <TableCell className="text-white text-left">{transaction.id}</TableCell>
                            <TableCell className="text-zinc-500 text-center align-middle">
                                {new Date(transaction.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-white text-center align-middle">
                                {transaction.tickets.length}
                            </TableCell>
                            <TableCell className="text-white text-center align-middle">
                                {transaction.promotion?.code ? transaction.promotion?.code : "-"}
                            </TableCell>
                            <TableCell className="text-white text-right">
                                Rp {transaction.amount.toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ApplicationLayout>
    );
}
