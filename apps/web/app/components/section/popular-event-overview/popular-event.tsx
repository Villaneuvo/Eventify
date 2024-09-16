"use client";

import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useEffect, useState } from "react";

const dummyProduct = {
    names: [
        {
            title: "Twice",
            rating: 4.9,
            location: "Jakarta Pusat, Indonesia",
        },
        {
            title: "Taylor Swift",
            rating: 4.3,
            location: "Citayem, Indonesia",
        },
        {
            title: "Eminem",
            rating: 4.7,
            location: "Jakarta Pusat, Indonesia",
        },
        {
            title: "Kanye West",
            rating: 4.5,
            location: "Bekasi, Indonesia",
        },
        {
            title: "Baby Metal",
            rating: 5,
            location: "Jakarta, Indonesia",
        },
    ],
    images: [
        {
            src: "/momo.jpeg",
            alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
            src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Model wearing plain black basic tee.",
        },
        {
            src: "https://images.unsplash.com/photo-1501527459-2d5409f8cf9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Model wearing plain gray basic tee.",
        },
        {
            src: "https://images.unsplash.com/photo-1522776302589-df9907421c44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Model wearing plain white basic tee.",
        },
        {
            src: "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Model wearing plain white basic tee.",
        },
    ],
};

interface Event {
    id: string;
    name: string;
    location: string;
    mainImage: string;
}

export default function PopularEvent() {
    const [event, setEvent] = useState<Event[]>([]);
    const [events, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let params: { pageSize: number } = {
                    pageSize: 100,
                };

                const response = await fetch(`http://5.9.116.5:3001/api/v1/events?pageSize=${params.pageSize}`);
                const data = await response.json();
                const filteredProduct = data.data.filter(
                    (event: any) => event.id === "0ea7a783-95c0-4c14-9ff0-ca2f732b06d6",
                );
                console.log("hehe");
                console.log(filteredProduct[0]);
                setEvent(filteredProduct);
            } catch (error) {
                console.log(error);
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
                        {/* <Link href={`/events/${event[0].id}`}>
                            <Image
                                height={1000}
                                width={1000}
                                alt={event[0]?.name}
                                src={event[0]?.mainImage}
                                className="h-full w-full object-cover object-center hover:blur-sm"
                            />
                            <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                                <span className="block text-base">{event[0].name}</span>
                                <span className="block">{event[0].location}</span>
                                <span className="text-xs flex items-center">
                                    <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                                    4.9 / 5
                                </span>
                            </div>
                        </Link> */}
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
                            <Image
                                height={1000}
                                width={1000}
                                alt={dummyProduct.images[1].alt}
                                src={dummyProduct.images[1].src}
                                className="hover:blur-sm h-full w-full object-cover object-center"
                            />
                            <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                                <span className="block text-base">{dummyProduct.names[1].title}</span>
                                <span>{dummyProduct.names[1].location}</span>
                                <span className="text-xs flex items-center">
                                    <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                                    {dummyProduct.names[1].rating} / 5
                                </span>
                            </div>
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
                            <Image
                                height={1000}
                                width={1000}
                                alt={dummyProduct.images[2].alt}
                                src={dummyProduct.images[2].src}
                                className="hover:blur-sm h-full w-full object-cover object-center"
                            />
                            <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                                <span className="block text-base">{dummyProduct.names[2].title}</span>
                                <span>{dummyProduct.names[2].location}</span>
                                <span className="text-xs flex items-center">
                                    <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                                    {dummyProduct.names[2].rating} / 5
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
                            <Image
                                height={1000}
                                width={1000}
                                alt={dummyProduct.images[2].alt}
                                src={dummyProduct.images[2].src}
                                className="hover:blur-sm h-full w-full object-cover object-center"
                            />
                            <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                                <span className="block text-base">{dummyProduct.names[3].title}</span>
                                <span>{dummyProduct.names[3].location}</span>
                                <span className="text-xs flex items-center">
                                    <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                                    {dummyProduct.names[3].rating} / 5
                                </span>
                            </div>
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
                            <Image
                                height={1000}
                                width={1000}
                                alt={dummyProduct.images[1].alt}
                                src={dummyProduct.images[1].src}
                                className="hover:blur-sm h-full w-full object-cover object-center"
                            />
                            <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                                <span className="block text-base">{dummyProduct.names[4].title}</span>
                                <span>{dummyProduct.names[4].location}</span>
                                <span className="text-xs flex items-center">
                                    <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                                    {dummyProduct.names[4].rating} / 5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
