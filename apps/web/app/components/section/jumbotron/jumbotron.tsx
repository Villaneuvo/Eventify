"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Jumbotron() {
    const [isCompassHovered, setCompassHovered] = useState(false);
    const [isMagHovered, setMagHovered] = useState(false);

    return (
        <div className="relative bg-white overflow-hidden lg:h-screen">
            <div className="xl:mx-[7.813rem] max-w-8xl flex xs:flex-col-reverse lg:flex-row mx-[3.125rem] md:mx-[4.688rem] lg:mx-[6.25rem]">
                <div className="lg:pt-24 pt-5 z-10 xs:pb-5 md:pb-0">
                    <div className="mx-auto max-w-6xl lg:mx-0">
                        <h1 className="font-bold text-4xl sm:text-5xl tracking-wide sm:tracking-tight sm:leading-normal sm:text-text-main">
                            Everything You Need for Perfect Music Event Adventures
                        </h1>
                        <p className="mt-2 text-base font-light text-justify leading-relaxed max-w-[26.5rem]">
                            with eventify, your go-to for both planning and enjoying events. Organizers can effortlessly
                            manage their events, while guests can find and book exciting experiences. Explore now and
                            create unforgettable moments!
                        </p>
                        <div className="mt-5 flex flex-row justify-start">
                            <Link href={"/"}>
                                <button
                                    className="flex flex-row items-center rounded-lg border-[3px] border-btn-jumbotron bg-btn-jumbotron p-3 text-sm font-medium text-bg-main shadow-jumbtron-btn-shadow hover:border-[3px] hover:border-main-color hover:bg-white hover:text-dark-charcoal xl:text-base"
                                    onMouseEnter={() => setCompassHovered(true)}
                                    onMouseLeave={() => setCompassHovered(false)}
                                >
                                    <picture>
                                        <Image
                                            src={`/${isCompassHovered ? "compass-333.png" : "compass-555.png"}`}
                                            alt="compass-white"
                                            width={24}
                                            height={24}
                                            className="mr-3 lg:mr-2 lg:h-5 lg:w-5"
                                        />
                                    </picture>
                                    Explore Events
                                </button>
                            </Link>
                            <Link href={"/events"} className="ml-5">
                                <button
                                    className="flex flex-row items-center rounded-lg border-[3px] border-main-color p-3 text-sm font-medium text-dark-charcoal shadow-jumbtron-btn-shadow hover:border-[3px] hover:border-btn-jumbotron hover:bg-btn-jumbotron hover:text-bg-main xl:text-base"
                                    onMouseEnter={() => setMagHovered(true)}
                                    onMouseLeave={() => setMagHovered(false)}
                                >
                                    <Image
                                        src={`/${isMagHovered ? "mag-555.png" : "mag-333.png"}`}
                                        alt="compass-white"
                                        width={24}
                                        height={24}
                                        className="mr-3 lg:mr-2 lg:h-5 lg:w-5"
                                    />
                                    Find an event
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden  relative sm:flex sm:flex-col items-center justify-center max-w-8xl">
                    <Image
                        src="/mba2-denger-lagu.png"
                        alt="jumbo"
                        width={2070}
                        height={1380}
                        className="z-[2] 2xl:pt-10"
                    />
                    <div className="absolute w-[8rem] h-[10rem] sm:w-[16rem] sm:h-[20rem] md:w-[20rem] md:h-[24rem] lg:w-[16rem] lg:h-[20rem] xl:top-32 2xl:top-8 bg-white xl:w-[22.5rem] xl:h-[26rem] 2xl:w-[26.5rem] 2xl:h-[32rem] rounded-b-[80px] rounded-t-[120px] border-2 border-black z-[1]" />
                </div>
            </div>
            <div className="relative w-[1200px] lg:h-[400px] md:h-24 ">
                <Image
                    src="/Group.svg"
                    alt="jumbo"
                    width={1300}
                    height={1000}
                    className="absolute -top-[750px] sm:-top-[1000px] lg:mt-0 lg:-top-[765px] xl:-top-[770px] lg:left-[325px] 2xl:-top-[670px] 2xl:left-[425px]"
                />
            </div>
        </div>
    );
}
