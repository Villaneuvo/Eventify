"use client";

import { ArrowRightStartOnRectangleIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { HomeIcon, Square2StackIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar } from "../components/panel/avatar";
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from "../components/panel/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "../components/panel/navbar";
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
} from "../components/panel/sidebar";
import { SidebarLayout } from "../components/panel/sidebar-layout";

function AccountDropdownMenu({ anchor }: { anchor: "top start" | "bottom end" }) {
    return (
        <DropdownMenu className="min-w-64" anchor={anchor}>
            <DropdownItem href="/api/auth/signout">
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Sign out</DropdownLabel>
            </DropdownItem>
        </DropdownMenu>
    );
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
    let pathname = usePathname();
    const { data: session } = useSession();

    return (
        <SidebarLayout
            navbar={
                <Navbar>
                    <NavbarSpacer />
                    <NavbarSection>
                        <Dropdown>
                            <DropdownButton as={NavbarItem}>
                                <Avatar src="/verssache.jpg" square />
                            </DropdownButton>
                            <AccountDropdownMenu anchor="bottom end" />
                        </Dropdown>
                    </NavbarSection>
                </Navbar>
            }
            sidebar={
                <Sidebar>
                    <SidebarHeader>
                        <SidebarSection className="max-lg:hidden">
                            <SidebarItem disabled>
                                <Image
                                    src="/eventify-round-blue.png"
                                    alt="Eventify"
                                    width={1000}
                                    height={1000}
                                    className="h-8 w-8"
                                />
                                <SidebarLabel>Eventify</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection>
                    </SidebarHeader>
                    <SidebarBody>
                        {session?.user?.role === "ATTENDEE" ? null : (
                            <SidebarSection>
                                <SidebarItem
                                    href="/account/event-organizer"
                                    className="mb-1"
                                    current={pathname === "/account/event-organizer"}
                                >
                                    <HomeIcon />
                                    <SidebarLabel>Home</SidebarLabel>
                                </SidebarItem>
                                <SidebarItem
                                    href="/account/event-organizer/events"
                                    className="mb-1"
                                    current={pathname.startsWith("/events")}
                                >
                                    <Square2StackIcon />
                                    <SidebarLabel>Events</SidebarLabel>
                                </SidebarItem>
                            </SidebarSection>
                        )}
                        <SidebarSpacer />
                    </SidebarBody>
                    <SidebarFooter className="max-lg:hidden">
                        <Dropdown>
                            <DropdownButton as={SidebarItem}>
                                <span className="flex min-w-0 items-center gap-3">
                                    <Avatar src="/verssache.jpg" className="size-10" square alt="" />
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                                            {session?.user?.name}
                                        </span>
                                        <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                            {session?.user?.email}
                                        </span>
                                    </span>
                                </span>
                                <ChevronUpIcon />
                            </DropdownButton>
                            <AccountDropdownMenu anchor="top start" />
                        </Dropdown>
                    </SidebarFooter>
                </Sidebar>
            }
        >
            {children}
        </SidebarLayout>
    );
}
