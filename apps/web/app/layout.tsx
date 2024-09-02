import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import "./theme-config.css";
import NavBar from "./components/section/navigation/NavBar";

const poppins = Poppins({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Eventify",
    description:
        "A platform that simplifies the process of creating, promoting, and attending events. The name is catchy and indicates the transformation of ideas into successful events.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <AuthProvider>
                    <Theme appearance="light" accentColor="indigo">
                        <NavBar />
                        <main className="p-5">
                            <Container>{children}</Container>
                        </main>
                    </Theme>
                </AuthProvider>
            </body>
        </html>
    );
}
