"use client";

import { Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const account = [
    {
        name: "Create an account",
        href: "/register",
    },
    {
        name: "Sign In",
        href: "/api/auth/signin",
    },
    {
        name: "Good day,",
        href: "/account",
    },
    {
        name: "Sign Out",
        href: "/api/auth/signout",
    },
];

const eventifyFeatures = [
    {
        name: "Claim Your Rewards",
        href: "#",
    },
    {
        name: "Find Events",
        href: "/events",
    },
    {
        name: "Eventify Your Events",
        href: "/eventify-your-event",
    },
];

const mobileNavigation = [
    {
        name: "Jakarta Pusat",
        href: "#",
    },
];

const navigation = [
    { name: "Find events", href: "/events", icon: null },
    { name: "Eventify your events", href: "/events/eventify-your-event", icon: null },
    { name: "Jakarta Pusat", href: "#", icon: MapPinIcon },
];

interface ItemEvent {
    id: string;
    price: number;
    mainImage: string;
    name: string;
    url?: string;
    date: string;
    time: string;
    location: string;
}

export default function NavigationBar() {
    const { status, data: session } = useSession();
    const currentPath = usePathname();
    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
    const [debouncedInput, setDebouncedInput] = useState(input);
    const [selectedArea, setSelectedArea] = useState("Jakarta Pusat");

    const handleSelection = (value: string) => {
        setSelectedArea(value);
    };

    const fetchData = async (val: string) => {
        try {
            let params: { pageSize: number } = {
                pageSize: 100,
            };

            const res = await fetch(`http://5.9.116.5:3001/api/v1/events?pageSize=${params.pageSize}`);
            const data = await res.json();
            const filteredData = data.data.filter((item: any) => {
                return (
                    item.name.toLowerCase().includes(val.toLowerCase()) ||
                    item.location.toLowerCase().includes(val.toLowerCase())
                );
            });
            if (filteredData.length === 0) {
                setResult([]);
                return;
            }
            setResult(filteredData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (val: string) => {
        setInput(val);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(input);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [input]);

    useEffect(() => {
        if (debouncedInput === "") {
            setResult([]);
            return;
        } else {
            fetchData(debouncedInput);
        }
    }, [debouncedInput]);

    if (status === "loading") {
        return <span>Loading...</span>;
    }

    const filteredAccount = account.filter((item) => {
        if (status === "authenticated" && item.name === "Sign Out") return true;
        if (status === "authenticated" && item.name === "Good day,") return true;
        if (status === "unauthenticated" && item.name === "Sign In") return true;
        if (status === "unauthenticated" && item.name === "Create an account") return true;
        return false;
    });

    return (
        <header className="border-b-2 bg-white">
            <nav
                className="max-w-8xl mx-[3.125rem] flex items-center justify-between py-4 md:mx-[4.688rem] lg:mx-[6.25rem] xl:mx-[7.813rem]"
                aria-label="Global"
            >
                <div className="flex">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <Image src="/logo.svg" alt="Logo" width={120} height={120} className="h-12 w-auto" />
                    </Link>
                </div>
                <div className="items-center justify-start xs:hidden sm:flex sm:flex-1 xl:ml-4">
                    <div className="w-full max-w-lg">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="relative flex xl:w-72">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => handleChange(e.target.value)}
                                className="rounded-4xl block w-full border border-black border-opacity-25 bg-bg-main p-3 text-xs shadow-search-bar-shadow placeholder:text-gray-400"
                                placeholder="Search Events"
                            />
                            <button className="my-auto h-8 w-8 -translate-x-9 cursor-pointer rounded-[100%] bg-main-color shadow-search-bar-shadow">
                                <div className="flex justify-center">
                                    <Image src="/magnifier-white-sm.png" alt="Logo" width={12} height={12} />
                                </div>
                            </button>
                        </div>
                        {input !== "" ? (
                            <div className="absolute z-20 w-96 mt-5 max-h-48 overflow-y-scroll overflow-x-hidden bg-white rounded-lg shadow-2xl border border-text-main/25">
                                <ul className="py-1">
                                    {result.length === 0 ? (
                                        <li className="p-4 text-sm text-text-main">No results found</li>
                                    ) : (
                                        result.map((item: ItemEvent) => (
                                            <li
                                                key={item.id}
                                                className="px-4 py-2 text-sm leading-5 text-text-main hover:bg-gray-50 "
                                            >
                                                <Link className="flex items-center" href={`/events/${item.id}`}>
                                                    <div className="w-32 shrink-0">
                                                        <Image
                                                            height={500}
                                                            width={500}
                                                            className="aspect-[3/2] rounded-lg shadow"
                                                            src={item.mainImage}
                                                            alt={item.name}
                                                        />
                                                    </div>
                                                    <div className="text-sm ml-3">
                                                        <span>{item.name}</span>
                                                        <span className="block text-xs">
                                                            {new Date(item.date).getDate()}-
                                                            {new Date(item.date).getMonth()}-
                                                            {new Date(item.date).getFullYear()}, {item.location}
                                                        </span>
                                                        <span className="block text-xs">Rp. {item.price}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="mr-5 xs:hidden sm:block">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={classNames({
                                "rounded-[1.875rem] p-2 text-xs font-medium text-main-color xl:text-sm":
                                    item.href === currentPath,
                                "font-regular rounded-[1.875rem] p-2 text-xs text-text-main xl:text-sm":
                                    item.href !== currentPath,
                                "transition-colors hover:rounded-[1.875rem] hover:bg-bg-main hover:font-semibold hover:text-main-color":
                                    true,
                            })}
                        >
                            {item.name === "Jakarta Pusat" && item.icon ? (
                                <div className="inline">
                                    <item.icon className="my-auto inline h-4 w-4" />
                                    <select
                                        className="border-0 rounded-[1.875rem] focus:outline-none"
                                        onChange={(e) => handleSelection(e.target.value)}
                                    >
                                        <option value="Jakarta Pusat">Jakarta Pusat</option>
                                        <option value="Jakarta Barat">Jakarta Barat</option>
                                        <option value="Jakarta Timur">Jakarta Timur</option>
                                        <option value="Jakarta Utara">Jakarta Utara</option>
                                        <option value="Jakarta Selatan">Jakarta Selatan</option>
                                    </select>
                                </div>
                            ) : (
                                <span className="sm:hidden lg:inline">
                                    {item.name}
                                    <div className="ml-3 inline w-[7.5rem] border border-text-main md:hidden lg:inline" />
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
                <PopoverGroup>
                    <Popover className="relative">
                        <PopoverButton className="rounded-4xl flex h-12 cursor-auto items-center justify-end gap-x-5 bg-blue-600 p-3 px-4 hover:-translate-y-1 hover:shadow-nav-btn-shadow xs:w-[6.5rem] lg:w-auto">
                            <Image src="/hamburger-btn.png" alt="Logo" width={16} height={16} />
                            <Image src="/user.png" alt="Logo" width={32} height={32} className="" />
                        </PopoverButton>

                        <Transition
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="rounded-3xl absolute -right-7 top-full z-10 mt-3 w-[20rem] max-w-md overflow-hidden bg-white shadow-nav-btn-shadow ring-1 ring-gray-900/5 md:right-3">
                                <div className="p-4 pb-0 text-text-main">
                                    {filteredAccount.map((item) => (
                                        <div
                                            key={item.name}
                                            className="rounded-lg group relative flex items-center gap-x-6 p-4 text-sm leading-6 hover:bg-gray-50"
                                        >
                                            <div className="flex-auto">
                                                <Link
                                                    // href={
                                                    //     session?.user?.role === "ORGANIZER"
                                                    //         ? `${item.href}/event-oraganizer`
                                                    //         : `${item.href}/attendee`
                                                    // }
                                                    href={
                                                        (item.name === "Good day," &&
                                                            session?.user?.role === "ORGANIZER") ||
                                                        session?.user?.role === "ADMIN"
                                                            ? `${item.href}/event-oraganizer`
                                                            : session?.user?.role === "ATTENDEE" &&
                                                                item.name === "Good day,"
                                                              ? `${item.href}/attendee`
                                                              : item.href
                                                    }
                                                    className="block font-medium text-text-main hover:text-main-color"
                                                >
                                                    {item.name === "Good day,"
                                                        ? item.name + " " + session?.user?.name
                                                        : item.name}
                                                    <span className="absolute inset-0" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-span-full my-1 h-px border-0 bg-zinc-950/50 dark:bg-text-main/25 forced-colors:bg-[CanvasText]" />
                                <div className="relative p-4 pb-0 pt-0 text-text-main md:pb-4 z-30">
                                    {eventifyFeatures.map((item) => (
                                        <div
                                            key={item.name}
                                            className="rounded-lg group relative flex items-center gap-x-6 p-4 text-sm leading-6 hover:bg-gray-50"
                                        >
                                            <div className="flex-auto">
                                                <Link
                                                    href={item.href}
                                                    className="block font-medium text-text-main hover:text-main-color"
                                                >
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 pt-0 text-text-main md:hidden">
                                    {mobileNavigation.map((item) => (
                                        <div
                                            key={item.name}
                                            className="rounded-lg group relative flex items-center gap-x-6 p-4 text-sm leading-6 hover:bg-gray-50"
                                        >
                                            <div className="flex-auto">
                                                <Link
                                                    href={item.href}
                                                    className="block font-medium text-text-main hover:text-main-color"
                                                >
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </Popover>
                </PopoverGroup>
            </nav>
        </header>
    );
}
