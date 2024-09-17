"use client";

import { StarIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
    id: string;
    name: string;
    location: string;
    mainImage: string;
}

export default function PopularEvent() {
    const [event, setEvent] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [eventsTwo, setEventsTwo] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                let params: { pageSize: number } = {
                    pageSize: 100,
                };

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/events?pageSize=${params.pageSize}`,
                );
                const data = response.data;
                const filteredProduct = data.data.filter((event: any) => event.name === "Twiceland Fantasy Park");
                const filteredProducts = data.data.filter(
                    (event: any) => event.location === "Jakarta Pusat, Indonesia",
                );
                const sliceProduct = filteredProducts.slice(1, 3);
                const sliceProductTwo = filteredProducts.slice(3, 5);

                setEvent(filteredProduct);
                setEvents(sliceProduct);
                setEventsTwo(sliceProductTwo);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="bg-white h-screen">
            <div className="py-16 sm:py-24 lg:mx-[7.813rem] ">
                <h2 className="text-xl font-medium ">Popular events happening in Jakarta Pusat</h2>
                <div className="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 cursor-pointer">
                    <div className="relative aspect-h-4 overflow-hidden aspect-w-3 rounded-2xl lg:block shadow-2xl">
                        <Link href={`/events/${event[0]?.id}`}>
                            <Image
                                height={1000}
                                width={1000}
                                alt={event[0]?.name}
                                src={event[0]?.mainImage}
                                className="h-full w-full object-cover object-center hover:blur-sm"
                            />
                            <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                                <span className="block text-base">{event[0]?.name}</span>
                                <span className="block">{event[0]?.location}</span>
                                <span className="text-xs flex items-center">
                                    <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                                    4.9 / 5
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        {events.map((event: Event, index) => (
                            <div key={index} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
                                <Link href={`/events/${event.id}`}>
                                    <Image
                                        height={1000}
                                        width={1000}
                                        alt={event.name}
                                        src={event.mainImage}
                                        className="hover:blur-sm h-full w-full object-cover object-center"
                                    />
                                    <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                                        <span className="block text-base">{event.name}</span>
                                        <span>{event.location}</span>
                                        <span className="text-xs flex items-center">
                                            <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                                            4.3 / 5
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        {eventsTwo.map((event: Event, index) => (
                            <div key={index} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
                                <Link href={`/events/${event.id}`}>
                                    <Image
                                        height={1000}
                                        width={1000}
                                        alt={event.name}
                                        src={event.mainImage}
                                        className="hover:blur-sm h-full w-full object-cover object-center"
                                    />
                                    <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                                        <span className="block text-base">{event.name}</span>
                                        <span>{event.location}</span>
                                        <span className="text-xs flex items-center">
                                            <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                                            4.3 / 5
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
