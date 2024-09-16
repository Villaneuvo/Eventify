import Image from "next/image";
import Link from "next/link";

const navigation = {
    quickLinks: [
        { name: "Home", href: "/" },
        { name: "Become event organizer", href: "/events/eventify-your-event" },
        { name: "Surf Events", href: "/events" },
    ],
    begginers: [
        { name: "New Account", href: "/login" },
        { name: "Start Booking a Event", href: "/events" },
        { name: "Redeem code", href: "/account" },
    ],
    exploreUs: [
        { name: "Our Careers", href: "https://www.gotocompany.com/careers" },
        {
            name: "Privacy",
            href: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLE-HiH1ky0KqkDHTtlYjxim524RBRIyh_1A&s",
        },
        { name: "Terms & Conditions", href: "https://help.instagram.com/581066165581870/" },
    ],
    connectUs: [
        { name: "Facebook", href: "https://www.facebook.com/", image: "facebook.svg" },
        { name: "Instagram", href: "https://www.instagram.com/gidhan/", image: "instagram.svg" },
        { name: "X.com", href: "https://x.com/wuthering_waves", image: "x.svg" },
        { name: "Youtube", href: "https://www.youtube.com/channel/UCyQi2cMwp20RKb-jxDiZ-WA", image: "youtube.svg" },
    ],
};

export default function Footer() {
    return (
        <footer aria-labelledby="footer-heading" className="bg-white border-t border-text-main/15 shadow-footer-shadow">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-4 ">
                        <Image src="/logo.svg" alt="Logo" width={120} height={120} className="h-12 w-auto" />
                        <div className="flex">
                            <Image src="/whatsapp.svg" alt="Footer Image" width={48} height={48} />
                            <div className="flex-col ml-3 text-sm justify-center flex ">
                                <span className="block font-medium">Whatsapp</span>
                                <span className="w-48">+62 877 0180 9127</span>
                            </div>
                        </div>
                        <div className="flex">
                            <Image src="/email.svg" alt="Footer Image" width={48} height={48} />
                            <div className="flex-col ml-3 text-sm justify-center flex ">
                                <span className="block font-medium">Email</span>
                                <span className="w-48">cs.eventify@evt.com</span>
                            </div>
                        </div>
                        <div className="flex">
                            <Image src="/location.svg" alt="Footer Image" width={48} height={48} />
                            <div className="flex-col ml-3 text-sm justify-center flex ">
                                <span className="block font-medium">Address</span>
                                <span className="w-48">Chase Plaza, Jl. Jenderal Sudirman No.21 Lt.13</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Quick Links</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.quickLinks.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">For Beginners</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.begginers.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Explore Us</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.exploreUs.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Connect Us</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {navigation.connectUs.map((item) => (
                                        <div key={item.name} className="flex flex-row">
                                            <Image src={`/${item.image}`} alt={item.name} width={24} height={24} />
                                            <li>
                                                <Link
                                                    href={item.href}
                                                    className="text-sm leading-6 ml-3 text-gray-600 hover:text-gray-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-24 border-t border-gray-900/10 pt-8 ">
                    <p className="text-xs leading-5 text-gray-500">
                        &copy; 2024 Eventify, inc. PT. Global Eventify Ticketing Pte. Ltd. All Right Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
