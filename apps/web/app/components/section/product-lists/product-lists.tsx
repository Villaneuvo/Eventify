import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Leather Long Wallet",
    startDate: "Satuday, 12.00 PM",
    location: "Jakarta Pusat, Indonesia",
    price: "275.000",
    rating: 4.9,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 2,
    name: "Leather Long Wallet",
    startDate: "Satuday, 12.00 PM",
    location: "Jakarta Pusat, Indonesia",
    price: "275.000",
    rating: 4.4,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 3,
    name: "Leather Long Wallet",
    startDate: "Satuday, 12.00 PM",
    location: "Jakarta Pusat, Indonesia",
    price: "275.000",
    rating: 4.2,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 4,
    name: "Leather Long Wallet",
    startDate: "Satuday, 12.00 PM",
    location: "Jakarta Pusat, Indonesia",
    price: "275.000",
    rating: 4.5,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 5,
    name: "Leather Long Wallet",
    startDate: "Satuday, 12.00 PM",
    location: "Jakarta Pusat, Indonesia",
    price: "275.000",
    rating: 4.8,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 6,
    name: "Leather Long Wallet",
    startDate: "Satuday, 12.00 PM",
    location: "Jakarta Pusat, Indonesia",
    price: "275.000",
    rating: 4.7,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 7,
    name: "Leather Long Wallet",
    startDate: "Satuday, 12.00 PM",
    location: "Jakarta Pusat, Indonesia",
    price: "275.000",
    rating: 4.6,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 8,
    name: "Leather Long Wallet",
    startDate: "Satuday, 12.00 PM",
    location: "Jakarta Pusat, Indonesia",
    price: "275.000",
    rating: 4.9,
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
];

const genres = [
  {
    id: 1,
    name: "Jazz",
    href: "#",
    image: "/jazz.svg",
  },
  {
    id: 2,
    name: "K-Pop",
    href: "#",
    image: "/kpop.svg",
  },
  {
    id: 3,
    name: "Pop",
    href: "#",
    image: "/pop.svg",
  },
  {
    id: 4,
    name: "EDM",
    href: "#",
    image: "/electronic.svg",
  },
  {
    id: 5,
    name: "Rock",
    href: "#",
    image: "/rock.svg",
  },
  {
    id: 6,
    name: "Hip Hop",
    href: "#",
    image: "/hiphop.svg",
  },
  {
    id: 7,
    name: "Indie",
    href: "#",
    image: "/indie.svg",
  },
];

export default function ProductList() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-gray-900">
            Explore more events
          </h2>
          <div className="bg-blue-cold p-4 flex items-center flex-row rounded-2xl shadow-2xl">
            {genres.map((genre) => (
              <Link
                href={genre.href}
                key={genre.id}
                className="flex flex-col items-center mx-3 text-bg-main hover:text-main-color"
              >
                <div className=" bg-gray-50 border border-black rounded-[100%] p-3 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 w-full h-fit">
                  <Image
                    height={32}
                    width={32}
                    src={genre.image}
                    alt="search"
                  />
                </div>

                <span className="mt-1">{genre.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative my-8">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <Image
                  height={100}
                  width={100}
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-lg text-schivia-blue">
                <Link href={product.href}>
                  <span className="absolute inset-0 " />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-xs text-schivia-blue">
                {product.startDate}
              </p>
              <p className="mt-1 text-xs text-gray-500 mb-2">
                {product.location}
              </p>
              <div className="flex justify-between">
                <p className="mt-1 text-sm font-medium text-gray-900">
                  Rp. {product.price}
                </p>
                <span className="text-xs flex flex-row items-center">
                  <StarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                  {product.rating} / 5
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
