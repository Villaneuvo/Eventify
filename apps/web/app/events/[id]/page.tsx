"use client";

import AdditionalInformationProduct from "@/app/components/additional-information-product";
import ProductList from "@/app/components/product-list";
import Footer from "@/app/components/section/footer/Footer";
import NavigationBar from "@/app/components/section/navigation/NavBar";
import { errorAxios } from "@/app/interfaces/axiosHandling";
import { Event } from "@/app/interfaces/db";
import { formatDate } from "@/app/utils/helpers";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailsEventPage({ params }: { params: { id: string } }) {
    const eventId = params.id;

    const [event, setEvent] = useState<Event>({} as Event);
    const { data: session } = useSession();
    const token = session?.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [ticketCount, setTicketCount] = useState("1");
    const router = useRouter();

    const handleTicketCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow empty value or a numeric value, reject anything else
        if (/^\d*$/.test(value)) {
            if (value === "" || parseInt(value) <= event.availableTicket) {
                setTicketCount(value);
            }
        }
    };

    const handlePaymentRedirect = () => {
        const tickets = ticketCount ? parseInt(ticketCount) : 1;
        router.push(`/events/payment-method?eventId=${eventId}&tickets=${tickets}`);
    };

    useEffect(() => {
        async function fetchEvent() {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/events/${eventId}`, config);
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                setError((error as errorAxios).message || "Failed to fetch products");
                setLoading(false);
            }
        }
        fetchEvent();
    }, [eventId]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <>
            <NavigationBar />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 container py-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/3">
                        <Image
                            src={event.mainImage}
                            alt="Event main"
                            className="rounded-lg mx-auto"
                            width={500}
                            height={500}
                        />
                        <div className="mt-6">
                            <h1 className="text-3xl font-bold">{event.name}</h1>
                            <p className="text-gray-600">{event.description}</p>
                        </div>
                        <div className="mt-4">
                            <AdditionalInformationProduct />
                        </div>
                    </div>

                    <div className="md:w-1/3 md:pl-8 mt-8 md:mt-0">
                        <div className="p-4 border rounded-lg shadow-lg">
                            <p className="font-semibold text-lg">Organized by</p>
                            <p>{event.organizer.name}</p>
                        </div>

                        <div className="mt-8 p-4 border rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Buy Tickets</h2>
                            {event.price <= 0 && <p className="text-lg font-bold mb-2">FREE</p>}
                            {event.price > 0 && (
                                <p className="text-lg font-bold mb-2">Price: Rp {event.price.toLocaleString()}</p>
                            )}
                            <p className="text-sm text-gray-600 mb-2">Available Tickets: {event.availableTicket}</p>
                            <div className="flex items-center mb-4">
                                <label className="mr-4 font-semibold">Tickets:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={ticketCount}
                                    onChange={handleTicketCountChange}
                                    className="w-16 p-2 border rounded"
                                />
                            </div>
                            <button
                                onClick={handlePaymentRedirect}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg w-full"
                            >
                                Proceed to Payment
                            </button>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-2">Location</h2>
                            <div className="flex items-center">
                                <MapPinIcon className="w-6 h-6 text-gray-600" />
                                <p className="ml-2">{event.location}</p>
                            </div>
                            <div className="my-4">
                                <iframe
                                    src={`https://www.google.com/maps?q=${event.location}&output=embed`}
                                    width="100%"
                                    height="250"
                                    className="rounded-lg"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">Date and Time</h2>
                            <div className="flex items-center">
                                <CalendarDaysIcon className="w-6 h-6 text-gray-600" />
                                <p className="ml-2">{formatDate(new Date(event.date))}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">You Might Be Interested</h2>
                    <ProductList limitDefault={4} category={event.genre} />
                </div>
            </div>
            <Footer />
        </>
    );
}
