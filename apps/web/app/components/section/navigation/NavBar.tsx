"use client";

import { Button, DropdownMenu } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationButton } from "../../NavigationButton";
import { SearchBar } from "../../SearchBar";

const NavBar = () => {
  const { status } = useSession();
  const currentPath = usePathname();

  let authPage = false;
  if (currentPath === "/auth/login" || currentPath === "/auth/register")
    authPage = true;

  const links = [
    { href: "/account", label: "Find events" },
    { href: "/ticket", label: "Eventify your event" },
    { href: "/transaction", label: "Jakarta Pusat" },
  ];

  return (
    <nav className="border-b">
      <div className="flex h-20 items-center justify-between md:mx-[4.688rem] lg:mx-[6.25rem] xl:mx-[7.813rem]">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="mb-1"
            />
          </Link>
        </div>
        <div className="flex flex-grow">
          <SearchBar />
        </div>

        {!authPage && (
          <div className="z-10 ml-10 md:-ml-4">
            <ul className="flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames({
                    "rounded-[1.875rem] text-xs font-bold text-text-main lg:p-2 xl:p-3 xl:text-sm":
                      link.href === currentPath,
                    "font-regular rounded-[1.875rem] text-xs text-text-main lg:p-2 xl:p-3 xl:text-sm":
                      link.href !== currentPath,
                    "transition-colors hover:rounded-[1.875rem] hover:bg-bg-main hover:font-semibold hover:text-main-color":
                      true,
                    "lg:w-24 xl:w-28": link.label === "Find events",
                    "lg:w-[138px] xl:w-40":
                      link.label === "Eventify your event",
                    "lg:w-28 xl:w-32": link.label === "Jakarta Pusat",
                  })}
                >
                  {link.label}
                </Link>
              ))}
            </ul>
          </div>
          //   <div className="z-10 lg:translate-x-[8.5rem] xl:translate-x-[17.5rem]">
          //   <ul className="flex">
          //     {links.map((link) => (
          //       <Link
          //         key={link.href}
          //         href={link.href}
          //         className={classNames({
          //           // Set individual widths for each link using Tailwind's `w-*` classes
          //           "rounded-[1.875rem] p-3 text-sm font-bold text-text-main w-20": link.label === "Find events",
          //           "rounded-[1.875rem] p-3 text-sm font-bold text-text-main w-32": link.label === "Eventify your event",
          //           "rounded-[1.875rem] p-3 text-sm font-bold text-text-main w-16": link.label === "Jakarta Pusat",
          //           "transition-colors hover:rounded-[1.875rem] hover:bg-bg-main hover:font-semibold hover:text-main-color":
          //             true,
          //         })}
          //       >
          //         {link.label}
          //       </Link>
          //     ))}
          //   </ul>
          // </div>
        )}

        {status === "authenticated" && (
          <div className="flex-shrink-0">
            <Button>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          </div>
        )}
        {status === "unauthenticated" && (
          <div className="flex-shrink-0">
            {/* <Button>
                        <Link href="/api/auth/signin">Sign In</Link>
                    </Button> */}
            <NavigationButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
