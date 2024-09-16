import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function BecomeOrganizer() {
    const { data: session } = useSession();
    const [organizer, setOrganizer] = useState("");
    const [phone, setPhone] = useState("");
    const [purpose, setPurpose] = useState("");

    const text = encodeURIComponent(
        `Halo, \n\nSaya ingin Menjadi bagian dari organizer eventify dan saya telah mengisi form pendaftaran dengan format:\nNama: ${session?.user?.name}\nNama Organizer: ${organizer}\nEmail: ${session?.user?.email}\nNomor Telepon: ${phone}\nTujuan: ${purpose}\n\nTerima kasih. Salam, ${session?.user?.name}`,
    );

    return (
        <>
            <div className="relative isolate bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                    <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                                <svg
                                    aria-hidden="true"
                                    className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                >
                                    <defs>
                                        <pattern
                                            x="100%"
                                            y={-1}
                                            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                            width={200}
                                            height={200}
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <path d="M130 200V.5M.5 .5H200" fill="none" />
                                        </pattern>
                                    </defs>
                                    <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                                    <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                                        <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                    </svg>
                                    <rect
                                        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                                        width="100%"
                                        height="100%"
                                        strokeWidth={0}
                                    />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold tracking-wide text-main-color">
                                Join us To Create Magnificient Music Event!
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                {`With our platform, you can create your own music event and share it with the world. Fill
                                out the form below and we'll get back to you as soon as possible.`}
                            </p>
                            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Address</span>
                                        <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                                    </dt>
                                    <dd>
                                        Chase Plaza,
                                        <br />
                                        Jl. Jenderal Sudirman No.21 Lt.13
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Telephone</span>
                                        <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                                    </dt>
                                    <dd>
                                        <a href="tel:+1 (555) 234-5678" className="hover:text-gray-900">
                                            +62 877 0180 9127
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Email</span>
                                        <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                                    </dt>
                                    <dd>
                                        <a href="mailto:cs.eventify@evt.com" className="hover:text-gray-900">
                                            cs.eventify@evt.com
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <form action="#" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Fullname
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="first-name"
                                            name="first-name"
                                            value={session?.user?.name || ""}
                                            type="text"
                                            disabled={true}
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="organizer"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Organizer Name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="organizer"
                                            name="organizer"
                                            type="text"
                                            value={organizer}
                                            onChange={(e) => setOrganizer(e.target.value)}
                                            autoComplete="given-name"
                                            placeholder="e.g, NamaBapakmuAdalahNamaIstrikuSaatIni"
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Email
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="email"
                                            name="email"
                                            value={session?.user?.email || ""}
                                            type="email"
                                            disabled={true}
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="phone-number"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Phone number
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="phone-number"
                                            name="phone-number"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            autoComplete="tel"
                                            required
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="purpose"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Purpose
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            id="purpose"
                                            name="purpose"
                                            value={purpose}
                                            onChange={(e) => setPurpose(e.target.value)}
                                            rows={4}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={""}
                                            required
                                            placeholder="Brief description of your purpose"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <Link href={`https://api.whatsapp.com/send?phone=6287733151286&text=${text}`}>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Request to be an organizer
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
