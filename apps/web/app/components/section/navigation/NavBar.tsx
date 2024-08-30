"use client";

import { Button, DropdownMenu } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationButton } from "../../Button";
import { SearchBar } from "../../SearchBar";

const NavBar = () => {
    const { status } = useSession();
    const currentPath = usePathname();

    let authPage = false;
    if (currentPath === "/auth/login" || currentPath === "/auth/register") authPage = true;

    const links = [
        { href: "/account", label: "Find events" },
        { href: "/ticket", label: "Eventify your event" },
        { href: "/transaction", label: "Jakarta Pusat" },
    ];

    return (
        <nav className="border-b">
            <div className="flex h-20 items-center justify-between  px-5 xl:mx-[7.813rem]">
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image src="/logo.svg" alt="Logo" width={100} height={100} className="mb-1" />
                    </Link>
                </div>
                <div className="flex-grow flex justify-center">
                    <SearchBar />
                </div>

                {!authPage && (
                    <div className="flex-grow flex justify-end mr-6 translate-x-72 z-10">
                        <ul className="flex space-x-6">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={classNames({
                                        "text-sm text-text-main font-bold": link.href === currentPath,
                                        "text-sm text-text-main font-regular": link.href !== currentPath,
                                        "transition-colors hover:text-main-color": true,
                                    })}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </ul>
                    </div>
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
