"use client";

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";

import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const account = [
  {
    name: "Create an account",
    href: "#",
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
    href: "#",
  },
  {
    name: "Eventify Your Events",
    href: "#",
  },
];

const mobileNavigation = [
  {
    name: "Jakarta Pusat",
    href: "#",
  },
];

const navigation = [
  { name: "Find events", href: "/account", icon: null },
  { name: "Eventify your events", href: "/ticket", icon: null },
  { name: "Jakarta Pusat", href: "/transaction", icon: MapPinIcon },
];

export default function NavigationBar() {
  const { status, data: session } = useSession();
  const currentPath = usePathname();

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  const filteredAccount = account.filter((item) => {
    if (status === "authenticated" && item.name === "Sign Out") return true;
    if (status === "authenticated" && item.name === "Good day,") return true;
    if (status === "unauthenticated" && item.name === "Sign In") return true;
    if (status === "unauthenticated" && item.name === "Create an account")
      return true;
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
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={120}
              className="h-12 w-auto"
            />
          </Link>
        </div>
        <div className="items-center justify-start xs:hidden sm:flex sm:flex-1 xl:ml-4">
          <div className="w-full max-w-lg">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative flex xl:w-72">
              <input
                type="search"
                id="search"
                className="rounded-4xl block w-full border border-black border-opacity-25 bg-bg-main p-3 text-xs shadow-search-bar-shadow placeholder:text-gray-400"
                name="search"
                placeholder="Search Events"
              />
              <button className="my-auto h-8 w-8 -translate-x-9 cursor-pointer rounded-[100%] bg-main-color shadow-search-bar-shadow">
                <div className="flex justify-center">
                  <Image
                    src="/magnifier-white-sm.png"
                    alt="Logo"
                    width={12}
                    height={12}
                  />
                </div>
              </button>
            </div>
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
                  <item.icon className="my-auto mr-2 inline h-4 w-4" />
                  {item.name}
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
              <Image
                src="/hamburger-btn.png"
                alt="Logo"
                width={16}
                height={16}
              />
              <Image
                src="/user.png"
                alt="Logo"
                width={32}
                height={32}
                className=""
              />
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
                          href={item.href}
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
