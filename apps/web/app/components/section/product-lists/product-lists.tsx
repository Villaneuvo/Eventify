import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 2,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 3,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 4,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 5,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 6,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 7,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 8,
    name: "Leather Long Wallet",
    color: "Natural",
    price: "$75",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
];

export default function ProductList() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Trending products
          </h2>
          <Link
            href="#"
            className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <Image
                  height={100}
                  width={100}
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <Link href={product.href}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <Link
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
