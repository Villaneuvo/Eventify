"use client";

import { loginSchema } from "@/app/utils/zodSchema";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
    const { status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    const register = searchParams.get("register");

    // if (status === "authenticated") {
    //   redirect("/");
    // }
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
            return;
        }
        if (register === "success") {
            setFromRegister(true);
        }
    }, [status, router]);

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fromRegister, setFromRegister] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFromRegister(false);
        const validationResult = loginSchema.safeParse({ email, password });
        if (!validationResult.success) {
            setError(validationResult.error.errors[0].message);
            return;
        }

        const result = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
        });

        if (result?.error) {
            setError("Incorrect email or password");
        } else {
            const callbackUrl = searchParams.get("callbackUrl") || "/";
            // router.push(callbackUrl);
            setTimeout(() => {
                router.push(callbackUrl);
            }, 0);
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
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Welcome Back!
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && <p className="text-center text-red-600 mb-1">{error}</p>}
                    {fromRegister && (
                        <p className="text-center text-white mx-auto relative mb-3 bg-green-500 p-2 rounded-lg">
                            Registered Success
                        </p>
                    )}
                    <form className="space-y-6" action="#" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link
                            href="/register"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
