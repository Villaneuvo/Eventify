"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Jumbotron() {
  const [isCompassHovered, setCompassHovered] = useState(false);
  const [isMagHovered, setMagHovered] = useState(false);

  return (
    <section className="xs:flex-col-reverse flex lg:flex-row">
      <div className="flex min-h-full md:mx-[4.688rem] lg:mx-[6.25rem] xl:mx-[7.813rem]">
        <div className="xs:mt-5 lg:mt-32">
          <h1 className="xs:w-[618px] xs:leading-normal text-3xl font-bold lg:w-[24.5rem] lg:text-3xl lg:leading-normal xl:w-[32.5rem] xl:text-4xl xl:leading-normal">
            Everything You Need for Perfect Music Event Adventures.
          </h1>
          <p className="mt-5 text-justify text-base font-light leading-relaxed lg:w-[22.5rem] xl:w-[26.5rem]">
            with eventify, your go-to for both planning and enjoying events.
            Organizers can effortlessly manage their events, while guests can
            find and book exciting experiences. Explore now and create
            unforgettable moments!
          </p>
          <div className="mt-5 flex flex-row">
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
            <Link href={"/api/auth/signin"} className="ml-5">
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
        <div className="h-full w-full"></div>
      </div>
      <div className="flex h-fit w-fit flex-col-reverse">
        <div className="">
          <Image
            src="/mba2-denger-lagu.png"
            alt="jumbo"
            width={2070}
            height={1380}
            className="md:-mt-[575px] lg:-mt-[210px] xl:-mt-[275px] 2xl:-mt-[475px] 3xl:-mt-[575px]"
          />
          <div className="md:- rounded-b-[80px] rounded-t-[120px] border-2 border-black bg-white md:-mt-[575px] md:ml-[165px] md:h-[575px] md:w-[450px] lg:-mt-[350px] lg:ml-[75px] lg:h-[350px] lg:w-[300px] xl:-mt-[375px] xl:ml-[110px] xl:h-[375px] xl:w-[300px] 2xl:-mt-[475px] 2xl:ml-[155px] 2xl:h-[475px] 2xl:w-[375px] 3xl:-mt-[500px] 3xl:ml-[185px] 3xl:h-[500px]"></div>
        </div>
        <div className="overflow-hidden">
          <Image
            src="/Group.svg"
            alt="jumbo"
            width={1300}
            height={1200}
            className="xl:-mt-8 2xl:-mt-11"
          />
        </div>
      </div>
    </section>
  );
}
