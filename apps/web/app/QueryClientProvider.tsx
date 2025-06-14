"use client";

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

// Create a client
const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: PropsWithChildren) {
    return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}
