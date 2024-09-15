"use client";

import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

const product = {
  names: [
    {
      title: "Twice",
      rating: 4.9,
      location: "Jakarta Pusat, Indonesia",
    },
    {
      title: "Taylor Swift",
      rating: 4.3,
      location: "Citayem, Indonesia",
    },
    {
      title: "Eminem",
      rating: 4.7,
      location: "Jakarta Pusat, Indonesia",
    },
    {
      title: "Kanye West",
      rating: 4.5,
      location: "Bekasi, Indonesia",
    },
    {
      title: "Baby Metal",
      rating: 5,
      location: "Jakarta, Indonesia",
    },
  ],
  images: [
    {
      src: "/momo.jpeg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://images.unsplash.com/photo-1501527459-2d5409f8cf9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://images.unsplash.com/photo-1522776302589-df9907421c44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Model wearing plain white basic tee.",
    },
    {
      src: "https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Model wearing plain white basic tee.",
    },
  ],
};

export default function PopularEvent() {
  return (
    <div className="bg-white h-screen">
      <div className="py-16 sm:py-24 lg:mx-[7.813rem] ">
        <h2 className="text-xl font-medium ">
          Popular events happening in Jakarta Pusat
        </h2>
        <div className="mx-auto mt-6 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 cursor-pointer">
          <div className="relative aspect-h-4 overflow-hidden aspect-w-3 rounded-2xl lg:block shadow-2xl">
            <Image
              height={1000}
              width={1000}
              alt={product.images[0].alt}
              src={product.images[0].src}
              className="h-full w-full object-cover object-center hover:blur-sm"
            />
            <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
              <span className="block text-base">{product.names[0].title}</span>
              <span className="block">{product.names[0].location}</span>
              <span className="text-xs flex items-center">
                <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                {product.names[0].rating} / 5
              </span>
            </div>
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
              <Image
                height={1000}
                width={1000}
                alt={product.images[1].alt}
                src={product.images[1].src}
                className="hover:blur-sm h-full w-full object-cover object-center"
              />
              <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                <span className="block text-base">
                  {product.names[1].title}
                </span>
                <span>{product.names[1].location}</span>
                <span className="text-xs flex items-center">
                  <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                  {product.names[1].rating} / 5
                </span>
              </div>
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
              <Image
                height={1000}
                width={1000}
                alt={product.images[2].alt}
                src={product.images[2].src}
                className="hover:blur-sm h-full w-full object-cover object-center"
              />
              <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                <span className="block text-base">
                  {product.names[2].title}
                </span>
                <span>{product.names[2].location}</span>
                <span className="text-xs flex items-center">
                  <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                  {product.names[2].rating} / 5
                </span>
              </div>
            </div>
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
              <Image
                height={1000}
                width={1000}
                alt={product.images[2].alt}
                src={product.images[2].src}
                className="hover:blur-sm h-full w-full object-cover object-center"
              />
              <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                <span className="block text-base">
                  {product.names[3].title}
                </span>
                <span>{product.names[3].location}</span>
                <span className="text-xs flex items-center">
                  <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                  {product.names[3].rating} / 5
                </span>
              </div>
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-2xl relative">
              <Image
                height={1000}
                width={1000}
                alt={product.images[1].alt}
                src={product.images[1].src}
                className="hover:blur-sm h-full w-full object-cover object-center"
              />
              <div className="absolute bottom-0 text-bg-main font-medium text-sm m-5">
                <span className="block text-base">
                  {product.names[4].title}
                </span>
                <span>{product.names[4].location}</span>
                <span className="text-xs flex items-center">
                  <StarIcon className="h-4 w-4 mr-1 mb-1 text-yellow-400" />
                  {product.names[4].rating} / 5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
