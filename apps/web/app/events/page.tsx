"use client";

import { Event } from "@/app/types";
import { Table } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EventGenreBadge } from "../components";
import EventAction from "./EventAction";

const EventPage = () => {
    const { data: session } = useSession();
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!session) return;

        const fetchEvents = async () => {
            if (!session.user?.token) {
                setError("No authorization token found. Please log in.");
                setIsLoading(false);
                return;
            }

            try {
                let url = "http://localhost:3001/api/v1/event";
                if (session.user.role === "ORGANIZER") {
                    url += `/organizer`;
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${session.user.token}`,
                    },
                });

                if (response.status !== 200) {
                    throw new Error(`Failed to fetch events: ${response.statusText}`);
                }

                setEvents(response.data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [session]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const time = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
        const day = date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        return `${time} - ${day}`;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-full">
                <div>Error loading events: {error}</div>
            </div>
        );
    }

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
                        {/* <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell> */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {events.map((event) => (
                        <Table.Row key={event.id}>
                            <Table.Cell>
                                <Link href={`/event/${event.id}`}>{event.name}</Link>
                                <div className="block md:hidden">
                                    <EventGenreBadge genre={event.genre} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <EventGenreBadge genre={event.genre} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{formatDate(event.date)}</Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{event.location}</Table.Cell>
                            {/* <Table.Cell className="hidden md:table-cell">{formatDate(event.createdAt)}</Table.Cell> */}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default EventPage;
