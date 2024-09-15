"use client";

import Image from "next/image";
import { useState } from "react";
import ProductList from "../../product-list";

const genres = [
    {
        name: "Jazz",
        genre: "JAZZ",
        href: "#",
        image: "/jazz.svg",
    },
    {
        name: "Pop",
        genre: "POP",
        href: "#",
        image: "/pop.svg",
    },
    {
        name: "EDM",
        genre: "ELECTRONIC",
        href: "#",
        image: "/electronic.svg",
    },
    {
        name: "Rock",
        genre: "ROCK",
        href: "#",
        image: "/rock.svg",
    },
    {
        name: "Hip Hop",
        genre: "HIPHOP",
        href: "#",
        image: "/hiphop.svg",
    },
    {
        name: "Indie",
        genre: "INDIE",
        href: "#",
        image: "/indie.svg",
    },
];

export default function ProductCategoryList() {
    const [genre, setGenre] = useState("JAZZ");
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 className="text-2xl font-medium tracking-tight text-gray-900">Explore more events</h2>
                    <div className="bg-blue-cold p-4 flex items-center flex-row rounded-2xl shadow-2xl">
                        {genres.map((genre, index) => (
                            <button
                                onClick={() => setGenre(genre.genre)}
                                key={index}
                                className="flex flex-col items-center mx-3 text-bg-main hover:text-main-color"
                            >
                                <div className=" bg-gray-50 border border-black rounded-[100%] p-3 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 w-full h-fit">
                                    <Image height={32} width={32} src={genre.image} alt="search" />
                                </div>

                                <span className="mt-1">{genre.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <ProductList limitDefault={4} category={genre} />
            </div>
        </div>
    );
}
