"use client";

import { Badge } from "@/app/components/panel/badge";
import { Divider } from "@/app/components/panel/divider";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/app/components/panel/dropdown";
import { Heading } from "@/app/components/panel/heading";
import { Input, InputGroup } from "@/app/components/panel/input";
import { Select } from "@/app/components/panel/select";
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { ApplicationLayout } from "../../sidebar-layout";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

import { Pagination, PaginationList, PaginationPage } from "@/app/components/panel/pagination";
import Image from "next/image";

export interface Event {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    ticketsSold: number;
    ticketsAvailable: number;
    status: string;
    mainImage: string;
    url?: string;
}

const EventsPage = () => {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const {
        data: eventsData,
        error,
        isLoading,
    } = useQuery<{ data: Event[]; pagination: { totalPages: number; total: number } }>({
        queryKey: ["events", page],
        queryFn: () => axios.get(`${BASE_URL}/api/v1/events`, { params: { page, pageSize } }).then((res) => res.data),
    });

    const events = eventsData?.data;
    const totalPages = eventsData?.pagination.totalPages || 1;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching events</div>;

    return (
        <ApplicationLayout>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Events</Heading>
                    <div className="mt-4 flex max-w-xl gap-4">
                        <div className="flex-1">
                            <InputGroup>
                                <MagnifyingGlassIcon />
                                <Input name="search" placeholder="Search events&hellip;" />
                            </InputGroup>
                        </div>
                        <div>
                            <Select name="sort_by">
                                <option value="name">Sort by name</option>
                                <option value="date">Sort by date</option>
                                <option value="status">Sort by status</option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="mt-10">
                {events?.map((event, index) => (
                    <li key={event.id}>
                        <Divider soft={index > 0} />
                        <div className="flex items-center justify-between">
                            <div key={event.id} className="flex gap-6 py-6">
                                <div className="w-32 shrink-0">
                                    <Link href={event.url ?? "/events"} aria-hidden="true">
                                        <Image
                                            height={500}
                                            width={500}
                                            className="aspect-[3/2] rounded-lg shadow"
                                            src={event.mainImage}
                                            alt={event.name}
                                        />
                                    </Link>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="text-base/6 font-semibold">
                                        <Link href={event.url ?? "/events"}>{event.name}</Link>
                                    </div>
                                    <div className="text-xs/6 text-zinc-500">
                                        {event.date} at {event.time} <span aria-hidden="true">·</span> {event.location}
                                    </div>
                                    <div className="text-xs/6 text-zinc-600">
                                        {event.ticketsSold}/{event.ticketsAvailable} tickets sold
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge className="max-sm:hidden" color={event.status === "On Sale" ? "lime" : "zinc"}>
                                    {event.status}
                                </Badge>
                                <Dropdown>
                                    <DropdownButton plain aria-label="More options">
                                        <EllipsisVerticalIcon />
                                    </DropdownButton>
                                    <DropdownMenu anchor="bottom end">
                                        <DropdownItem href={event.url ?? "/events"}>View</DropdownItem>
                                        <DropdownItem>Edit</DropdownItem>
                                        <DropdownItem>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="mt-8">
                <Pagination>
                    <PaginationList>
                        {/* Display pages dynamically */}
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <div key={i} onClick={() => setPage(i + 1)} className="cursor-pointer">
                                <PaginationPage href={`?page=${i + 1}`} current={i + 1 === page}>
                                    {i + 1}
                                </PaginationPage>
                            </div>
                        ))}
                    </PaginationList>
                </Pagination>
            </div>
        </ApplicationLayout>
    );
};

export default EventsPage;
