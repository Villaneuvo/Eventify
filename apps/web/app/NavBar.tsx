"use client";

import { Button } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const { status } = useSession();
    const currentPath = usePathname();

    let authPage = false;
    if (currentPath === "/auth/login" || currentPath === "/auth/register") authPage = true;

    const links = [
        { href: "/account", label: "Account" },
        { href: "/ticket", label: "Ticket" },
        { href: "/transaction", label: "Transaction" },
    ];

    return (
        <nav className="flex h-16 items-center justify-between border-b px-5">
            <div className="flex-shrink-0">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={100} height={100} className="mb-1" />
                </Link>
            </div>

            {!authPage && (
                <div className="flex-grow flex justify-center">
                    <ul className="flex space-x-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={classNames({
                                    "text-zinc-900": link.href === currentPath,
                                    "text-zinc-500": link.href !== currentPath,
                                    "transition-colors hover:text-zinc-800": true,
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
                    <Button>
                        <Link href="/api/auth/signin">Sign In</Link>
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
