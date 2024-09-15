"use client";

import { Switch } from "@headlessui/react";
import { CheckIcon, WalletIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import Modal from "../../modal-dialog";

const steps = [
  { id: "1", name: "Choose Methods", href: "#", status: "complete" },
  { id: "2", name: "Payment", href: "#", status: "current" },
  { id: "3", name: "Finish", href: "#", status: "upcoming" },
];

const paymentMethods = [
  {
    id: 1,
    name: "Gopay",
    imageSrc: "gopay.svg",
    imageAlt: "Gopay wallet logo",
  },
  {
    id: 2,
    name: "Dana",
    imageSrc: "dana.svg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 3,
    name: "OVO",
    imageSrc: "ovo-logo.svg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
];

export default function PaymentDetail() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);
  const [enabled, setEnabled] = useState(true);
  const [open, setOpen] = useState(false);

  const handleRadioChange = (id: number) => {
    setSelectedPaymentMethod(id);
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8 ">
          <h1 className="text-3xl font-bold tracking-tight text-main-color sm:text-4xl">
            Eventify
          </h1>
          <section aria-label="Progress" className="mt-3">
            <ol role="list" className="flex">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative flex">
                  {step.status === "complete" ? (
                    <a
                      href={step.href}
                      className="group flex w-full items-center"
                    >
                      <span className="flex items-center pr-6 py-4 text-sm font-medium">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-4xl bg-indigo-600 group-hover:bg-indigo-800">
                          <CheckIcon
                            aria-hidden="true"
                            className="h-3 w-3 text-white"
                          />
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-900">
                          {step.name}
                        </span>
                      </span>
                    </a>
                  ) : step.status === "current" ? (
                    <a
                      href={step.href}
                      aria-current="step"
                      className="flex items-center pr-6 py-4 text-sm font-medium"
                    >
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-4xl border-2 border-indigo-600">
                        <span className="text-indigo-600">{step.id}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-indigo-600">
                        {step.name}
                      </span>
                    </a>
                  ) : (
                    <a href={step.href} className="group flex items-center">
                      <span className="flex items-center py-4 text-sm font-medium">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-4xl border-2 border-gray-300 group-hover:border-gray-400">
                          <span className="text-gray-500 group-hover:text-gray-900">
                            {step.id}
                          </span>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                          {step.name}
                        </span>
                      </span>
                    </a>
                  )}

                  {stepIdx !== steps.length - 1 ? (
                    <>
                      {/* Arrow separator for lg screens and up */}
                      <div
                        aria-hidden="true"
                        className="absolute right-0 top-0 mt-4 flex h-full w-5 md:block"
                      >
                        <IoRemoveOutline className="items-center opacity-50" />
                      </div>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
          {/* Payment Timeline  >
          <div className="flex flex-1 flex-col justify-between ">
            <div className="relative grid grid-cols-2">
              <span className="text-sm font-semibold">
                Finish your payment in
              </span>
              <h3 className="absolute right-0">05:00</h3>
            </div>
          </div>
        </section> */}
          <h3 className="text-base font-semibold mt-5">Payment Methods</h3>
          <form className="mt-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="lg:col-span-7 border border-text-main/20 px-5 rounded-3xl shadow-lg"
            >
              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                <li className="flex py-6 sm:py-8 pl-4">
                  <div className="flex-shrink-0">
                    <WalletIcon className="h-12 w-12 text-main-color" />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div className="flex flex-col">
                        <h3 className="text-base font-medium pt-3 pb-1">
                          My Points
                        </h3>
                        <span className="text-xs font-light">Rp. 30.000</span>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute right-5 top-2">
                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-4xl border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
                          >
                            <span className="sr-only">Use setting</span>
                            <span className="pointer-events-none relative inline-block h-5 w-5 transform rounded-4xl bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
                              >
                                <svg
                                  fill="none"
                                  viewBox="0 0 12 12"
                                  className="h-3 w-3 text-gray-400"
                                >
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
                    </div>
                  </div>
                </li>
                {paymentMethods.map((item) => (
                  <li key={item.id} className="flex py-6 sm:py-8 pl-4">
                    <div className="flex-shrink-0">
                      <Image
                        height={48}
                        width={48}
                        alt={item.imageAlt}
                        src={`/${item.imageSrc}`}
                        className="h-12 w-1h-12 rounded-md object-cover object-center sm:h-12 sm:w-1h-12"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <h3 className="text-base font-medium py-3">
                          {item.name}
                        </h3>
                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="absolute right-10 top-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              id={item.id.toString()}
                              value={item.name}
                              checked={selectedPaymentMethod === item.id}
                              onChange={() => handleRadioChange(item.id)}
                              className="h-5 w-5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-text-main/20 rounded-3xl shadow-lg"
            >
              <h3
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h3>

              <dl className="mt-3 space-y-2">
                <dt className="text-sm text-text-main font-medium">
                  Enter a coupon
                </dt>
                <div className="w-full">
                  <div className="flex w-80 gap-x-2">
                    <input
                      type="search"
                      id="search"
                      className="rounded-lg block h-14 w-72 border border-black border-opacity-25 bg-bg-main p-3 text-xs placeholder:text-gray-400"
                      name="search"
                      placeholder="Search Events"
                    />
                    <div className="relative">
                      <button className="absolute left-0 top-1 text-sm my-auto h-12 w-32 cursor-pointer rounded-lg hover:bg-gold-50 bg-gold shadow-search-bar-shadow">
                        Apply Coupon
                      </button>
                    </div>
                  </div>
                </div>
                <dt className="text-sm text-text-main font-medium">
                  Total Tickets
                </dt>
                <div className="flex items-center justify-between border-b border-gray-200 py-2">
                  <dt className="text-sm text-gray-600">
                    <span className="font-medium mr-2">1 x</span>Summer 2024
                    Final Boatride
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    Rp. 475.000
                  </dd>
                </div>
                <dt className="text-sm text-text-main font-medium">Discount</dt>
                <div className="flex items-center justify-between border-gray-200 pt-2">
                  <dt className="flex text-sm text-gray-600">
                    <span className="text-sm text-gray-600">Point used</span>
                  </dt>
                  <dd className="text-sm font-medium text-lime-green">
                    - Rp. 25.000
                  </dd>
                </div>
                <div className="flex items-center justify-between border-gray-200 pt-1">
                  <dt className="flex text-sm text-gray-600">
                    <span className="text-sm text-gray-600">
                      Coupon: PROMO50
                    </span>
                  </dt>
                  <dd className="text-sm font-medium text-lime-green">
                    - Rp. 150.000
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Total Price
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    Rp. 300.000
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full rounded-md border border-transparent bg-main-color px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  Checkout
                </button>
              </div>
            </section>
          </form>
        </div>
        {open && <Modal open={open} setOpen={setOpen} />}
      </div>
      <footer
        aria-labelledby="footer-heading"
        className="bg-white border-t border-gray-900/10"
      >
        <div className="lg:mx-[6.25rem] xl:mx-[7.813rem] pb-8">
          <div className=" pt-8 md:flex md:items-center md:justify-between ">
            <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
              &copy; 2020 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
