"use client";

import { StarIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { errorAxios } from "../interfaces/axiosHandling";
import { Event, Review } from "../interfaces/db";
import { formatCurrency, formatDate } from "../utils/helpers";

export default function ProductList({ limitDefault, category = "" }: { limitDefault: number; category: string }) {
    const [currPage, setCurrPage] = useState(1);
    const [limit, setLimit] = useState(limitDefault || 4);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                let params: { pageSize: number; category?: string; page: number } = {
                    pageSize: limit,
                    page: currPage,
                };
                if (category !== "") {
                    params = {
                        ...params,
                        category: category,
                    };
                }
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/events`, { params });
                setTotalPages(response.data.pagination.totalPages);
                setProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                setError((error as errorAxios).message || "Failed to fetch products");
                setLoading(false);
            }
        }
        fetchProducts();
    }, [category, currPage, limit]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const handlePrevPage = () => {
        if (currPage > 1) setCurrPage(currPage - 1);
    };
    const handleNextPage = () => {
        if (currPage < totalPages) setCurrPage(currPage + 1);
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`px-3 py-1 ${
                            currPage === i ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                        } rounded border`}
                        onClick={() => setCurrPage(i)}
                    >
                        {i}
                    </button>,
                );
            }
        } else {
            if (currPage > 2) {
                pageNumbers.push(
                    <button
                        key={1}
                        className={`px-3 py-1 ${
                            currPage === 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                        } rounded border`}
                        onClick={() => setCurrPage(1)}
                    >
                        1
                    </button>,
                );

                pageNumbers.push(
                    <span key="left-ellipsis" className="px-2">
                        ...
                    </span>,
                );
            }

            const startPage = Math.max(2, currPage - 1);
            const endPage = Math.min(totalPages - 1, currPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`px-3 py-1 ${
                            currPage === i ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                        } rounded border`}
                        onClick={() => setCurrPage(i)}
                    >
                        {i}
                    </button>,
                );
            }

            if (currPage < totalPages - 1) {
                pageNumbers.push(
                    <span key="right-ellipsis" className="px-2">
                        ...
                    </span>,
                );
                pageNumbers.push(
                    <button
                        key={totalPages}
                        className={`px-3 py-1 ${
                            currPage === totalPages ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                        } rounded border`}
                        onClick={() => setCurrPage(totalPages)}
                    >
                        {totalPages}
                    </button>,
                );
            }
        }

        return pageNumbers;
    };
    return (
        <>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                {products.map((product: Event) => {
                    const rating =
                        product.reviews.length !== 0
                            ? product.reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) /
                              product.reviews.length
                            : 4;
                    return (
                        <div key={product.id} className="group relative my-8">
                            <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                                <Image
                                    height={500}
                                    width={500}
                                    alt={product.name}
                                    src={product.mainImage}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <h3 className="mt-4 text-lg text-schivia-blue">
                                <Link href={`/events/${product.id}`}>
                                    <span className="absolute inset-0 " />
                                    {product.name}
                                </Link>
                            </h3>
                            <p className="mt-1 text-xs text-schivia-blue">{formatDate(product.date)}</p>
                            <p className="mt-1 text-xs text-gray-500 mb-2">{product.location}</p>
                            <div className="flex justify-between">
                                <p className="mt-1 text-sm font-medium text-gray-900">
                                    {product.price === 0 ? "FREE" : formatCurrency(product.price)}
                                </p>
                                <span className="text-xs flex flex-row items-center">
                                    <StarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                                    {rating} / 5
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="flex items-center space-x-2 justify-center mb-10">
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={handlePrevPage}
                    disabled={currPage === 1}
                >
                    Prev
                </button>

                {renderPageNumbers()}

                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={handleNextPage}
                    disabled={currPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
}
