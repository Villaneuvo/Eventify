import Image from "next/image";
import Link from "next/link";

export default function ConfirmEmailPage() {
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
                    <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Please verify your email
                    </h2>
                </div>

                <div className="mt-8 text-center sm:mx-auto sm:w-full sm:max-w-sm">
                    <p>{`You're almost there! We sent email to`}</p>
                    <p className="font-bold">member@email.com</p>
                    <p className="mt-8 text-pretty">
                        {`Just click on the link in that email to complete your sign up. If you don't see it, you may need
                        to check your spam folder.`}
                    </p>
                    <Link
                        href="/"
                        className="mt-8 block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </>
    );
}
