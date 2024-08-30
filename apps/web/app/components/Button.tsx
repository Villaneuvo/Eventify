"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import React from "react";

const NavigationButton = () => {
    const navLinksItem = [
        { title: "Create an account", href: "/primitives/docs/overview/introduction" },
        { title: "Sign in", href: "/api/auth/signin" },
        { title: "Claim your rewards", href: "/primitives/docs/guides/styling" },
        { title: "Find events", href: "/primitives/docs/guides/animation" },
        { title: "Eventify your events", href: "/primitives/docs/overview/accessibility" },
    ];
    return (
        <NavigationMenu.Root className="NavigationMenuRoot relative flex justify-end w-[24.688rem] z-[1]">
            <NavigationMenu.List className="relative flex justify-center w-[5.875rem] bg-main-color rounded-[1.875rem] shadow-nav-btn-shadow mx-0 hover:bg-red-400">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger>
                        <div className="h-full w-full">
                            <Image
                                src="/hamburger-btn.png"
                                alt="Logo"
                                width={16}
                                height={16}
                                className="mr-4 mb-[10px]"
                            />
                        </div>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Trigger>
                        <div className="h-full w-full">
                            <Image src="/user.png" alt="Logo" width={32} height={32} className="mt-2" />
                        </div>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="NavigationMenuContent">
                        <ul className="List one">
                            {navLinksItem.map((item, index) => {
                                return <ListItem key={index} title={item.title} href={item.href} />;
                            })}
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
            </NavigationMenu.List>

            <div className="ViewportPosition">
                <NavigationMenu.Viewport className="NavigationMenuViewport" />
            </div>
        </NavigationMenu.Root>
    );
};

type ListItemProps = {
    className?: string;
    children?: React.ReactNode;
    title: string;
    href: string;
};

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
    ({ className, children, title, ...props }, forwardedRef) => {
        return (
            <li>
                <NavigationMenu.Link asChild>
                    <Link className={classNames("ListItemLink", className)} {...props} href={props.href}>
                        <div className="ListItemHeading">{title}</div>
                        <p className="ListItemText">{children}</p>
                    </Link>
                </NavigationMenu.Link>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";

export { NavigationButton };
