import { Switch } from "@headlessui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryUrl {
    url: string;
}

export default function CreateEvent() {
    const { data: session } = useSession();
    const [eventName, setEventName] = useState("");
    const [eventPrice, setEventPrice] = useState("");
    const [availableTickets, setAvailableTickets] = useState("");
    const [eventImage, setEventImage] = useState("");
    const [promotionName, setPromotionName] = useState("");
    const [promotionDiscount, setPromotionDiscount] = useState("");
    const [validFrom, setValidFrom] = useState("");
    const [validUntil, setValidUntil] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [location, setLocation] = useState("Jakarta Pusat");
    const [genre, setGenre] = useState("ELECTRONIC");
    const [description, setDescription] = useState("");
    const [isPromotionEnabled, setPromotionEnabled] = useState(false);

    const token = session?.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (eventImage === "") {
                alert("Please upload an image for the event");
                return;
            }

            const data = {
                name: eventName,
                description: description,
                genre: genre,
                date: eventDate,
                location: location,
                price: +eventPrice,
                organizerId: session?.user.id,
                availableTicket: +availableTickets,
                mainImage: eventImage,
                promotions: [
                    {
                        code: promotionName,
                        discount: +promotionDiscount / 100,
                        validFrom: validFrom,
                        validUntil: validUntil,
                    },
                ],
            };

            const response = await axios.post("http://localhost:3001/api/v1/events", data, config);
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <>
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-main-color sm:text-4xl">
                        Eventify your event
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        {`Create your magnificent event with us. Fill out the form below and
            we'll get back to you as soon as possible.`}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="event-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                Event Name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="event-name"
                                    name="event-name"
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    placeholder="e.g, Rum and Music | The Ultimate Fete"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="genre" className="block text-sm font-semibold leading-6 text-gray-900">
                                Genre of Event
                            </label>
                            <div className="mt-2.5">
                                <select
                                    id="genre"
                                    name="genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>ELECTRONIC</option>
                                    <option>INDIE</option>
                                    <option>JAZZ</option>
                                    <option>ROCK</option>
                                    <option>POP</option>
                                    <option>HIPHOP</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="event-price"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Price
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="event-price"
                                    name="event-price"
                                    type="number"
                                    value={eventPrice}
                                    onChange={(e) => setEventPrice(e.target.value)}
                                    placeholder="e.g, Rp. 275.000"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="qty-ticket" className="block text-sm font-semibold leading-6 text-gray-900">
                                Available Tickets
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="qty-ticket"
                                    name="qty-ticket"
                                    type="number"
                                    value={availableTickets}
                                    onChange={(e) => setAvailableTickets(e.target.value)}
                                    placeholder="e.g, 100 seats"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="file-image" className="block text-sm font-semibold leading-6 text-gray-900">
                                Event Image
                            </label>
                            <CldUploadWidget
                                uploadPreset="nfirmxwi"
                                onSuccess={(result, widget) => {
                                    if (result?.event === "success") {
                                        const url = (result?.info as CloudinaryUrl)?.url;
                                        setEventImage(url);
                                    }
                                }}
                            >
                                {({ open }) => {
                                    return (
                                        <button
                                            className="mt-2.5 bg-main-color p-3 hover:bg-blue-700 text-bg-main rounded-xl"
                                            onClick={() => open()}
                                        >
                                            Upload Image
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>
                            {/* <div className="mt-2.5">
                                <input
                                    id="file-image"
                                    name="file-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button type="submit">Upload</button>
                            </div> */}
                        </div>
                        {isPromotionEnabled && (
                            <>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="promotion-name"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Promotion Name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="promotion-name"
                                            name="promotion-name"
                                            type="text"
                                            value={promotionName}
                                            onChange={(e) => setPromotionName(e.target.value)}
                                            placeholder="e.g, PROMO40"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="promotion-discount"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Promotion Discount
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="promotion-discount"
                                            name="promotion-discount"
                                            type="text"
                                            value={promotionDiscount}
                                            onChange={(e) => setPromotionDiscount(e.target.value)}
                                            placeholder="e.g, 40%"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label
                                        htmlFor="valid-from"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Valid From
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="valid-from"
                                            name="valid-from"
                                            type="date"
                                            value={validFrom}
                                            onChange={(e) => setValidFrom(e.target.value)}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <label
                                        htmlFor="valid-until"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        Valid Until
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="valid-until"
                                            name="valid-until"
                                            type="date"
                                            value={validUntil}
                                            onChange={(e) => setValidUntil(e.target.value)}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="sm:col-span-2">
                            <label htmlFor="event-date" className="block text-sm font-semibold leading-6 text-gray-900">
                                Date
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="event-date"
                                    name="event-date"
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
                                Location
                            </label>
                            <div className="mt-2.5">
                                <select
                                    id="location"
                                    name="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>Jakarta Pusat</option>
                                    <option>Jakarta Barat</option>
                                    <option>Jakarta Timur</option>
                                    <option>Jakarta Utara</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Description
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write description here..."
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 flex gap-x-3 justify-between">
                            <p className="text-sm">Use Promotion?</p>
                            <Switch
                                checked={isPromotionEnabled}
                                onChange={setPromotionEnabled}
                                className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-4xl border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
                            >
                                <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-4xl bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
                                    >
                                        <svg fill="none" viewBox="0 0 12 12" className="h-3 w-3 text-gray-400">
                                            <path
                                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
                                    >
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 12 12"
                                            className="h-3 w-3 text-indigo-600"
                                        >
                                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                        </svg>
                                    </span>
                                </span>
                            </Switch>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
