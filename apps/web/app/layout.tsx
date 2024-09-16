import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import QueryClientProvider from "./QueryClientProvider";
import { authOptions } from "./api/auth/authOptions";
import "./globals.css";
import AuthProvider from "./utils/authProvider";

const poppins = Poppins({
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Eventify",
    description:
        "A platform that simplifies the process of creating, promoting, and attending events. The name is catchy and indicates the transformation of ideas into successful events.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={poppins.className}>
                <QueryClientProvider>
                    <AuthProvider session={session}>
                        <main>{children}</main>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
