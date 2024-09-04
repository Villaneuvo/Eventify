import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import NavigationBar from "./components/section/navigation/NavBar";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <NavigationBar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
