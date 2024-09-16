"use client";

import { errorAxios } from "@/app/interfaces/axiosHandling";
import { registerSchema } from "@/app/utils/zodSchema";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RegisterPage() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
            return;
        }
    }, [status, router]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [referral, setReferral] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationResult = registerSchema.safeParse({
            name,
            email,
            password,
        });
        if (!validationResult.success) {
            setError(validationResult.error.errors[0].message);
            return;
        }

        try {
            const bodyReq = referral ? { name, email, password, referralCode: referral } : { name, email, password };
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/auth/register`, bodyReq);
            if (response.data.message === "Email is already registered") {
                setError("Email is already registered");
            }

            if (response.data.message === "Registration successful" && response.status === 201) {
                setError("");
                router.push(`/login?register=success`);
            }
        } catch (error) {
            console.error("Register error:", error);
            setError((error as errorAxios).message || "An error occurred");
        }
    }

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-20 w-auto"
                        src="/eventify-round-blue.png"
                        alt="Eventify"
                        width={1000}
                        height={1000}
                    />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Welcome!
                    </h2>
                    {error && <p className="text-center text-red-600 mb-1">{error}</p>}
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-4" action="#" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    onChange={(event) => setName(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="referral" className="block text-sm font-medium leading-6 text-gray-900">
                                Referral Code (Optional)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="referral"
                                    name="referral"
                                    type="text"
                                    autoComplete="referral"
                                    onChange={(event) => setReferral(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Already registered?{" "}
                        <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login to your account
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
