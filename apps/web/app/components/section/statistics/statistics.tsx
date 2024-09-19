"use client";

import axios from "axios";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Event } from "../../../interfaces/db";
import { DatasetBarChart, DatasetPieChart } from "../../../interfaces/statistics";
import { generateBorderColor, generateRandomColor } from "../../../utils/helpers";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);

export default function StatisticsSection() {
    const { data: session } = useSession();
    const token = session?.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [datasetPieChart, setDatasetPieChart] = useState<DatasetPieChart[]>([]);
    const [datasetBarChart, setDatasetBarChart] = useState<DatasetBarChart[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/events/organizer?pageSize=10000`,
                    config,
                );
                setEvents(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        let jakartaPusat = 0;
        let jakartaBarat = 0;
        let jakartaTimur = 0;
        let jakartaUtara = 0;
        const datasetPieChart = events.map((event: Event) => {
            if (event.location.includes("Jakarta Pusat")) {
                jakartaPusat++;
            } else if (event.location.includes("Jakarta Barat")) {
                jakartaBarat++;
            } else if (event.location.includes("Jakarta Timur")) {
                jakartaTimur++;
            } else if (event.location.includes("Jakarta Utara")) {
                jakartaUtara++;
            }

            const randomColor = generateRandomColor();
            return {
                label: event.name,
                data: event.availableTicket,
                backgroundColor: randomColor,
                borderColor: generateBorderColor(randomColor),
            };
        });

        const datasetBarChart = [
            {
                label: "Jakarta Pusat",
                data: jakartaPusat,
            },
            {
                label: "Jakarta Barat",
                data: jakartaBarat,
            },
            {
                label: "Jakarta Timur",
                data: jakartaTimur,
            },
            {
                label: "Jakarta Utara",
                data: jakartaUtara,
            },
        ];
        setDatasetBarChart(datasetBarChart);
        setDatasetPieChart(datasetPieChart);
    }, [events]);

    // Data for Ticket Sales per Event (Bar Chart)
    const barChartData = {
        labels: datasetBarChart.map((data) => data.label),
        datasets: [
            {
                label: "Total Events",
                data: datasetBarChart.map((data) => data.data),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Data for Ticket Distribution (Pie Chart)
    const pieChartData = {
        labels: datasetPieChart.map((data) => data.label),
        datasets: [
            {
                label: "Tickets sold",
                data: datasetPieChart.map((data) => data.data),
                backgroundColor: datasetPieChart.map((data) => data.backgroundColor),
                borderColor: datasetPieChart.map((data) => data.borderColor),
                borderWidth: 1,
            },
        ],
    };

    const optionsBarChart = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: false,
                text: "Total Events per Location",
            },
        },
    };
    const optionsPieChart = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top" as const,
            },
            title: {
                display: false,
                text: "Ratio of Tickets Sold per Event",
            },
        },
    };
    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex justify-center align-center gap-5">
            <div className="w-1/2 mx-auto my-auto h-fit">
                <h3 className="text-center">Total Events per Location</h3>
                <Bar data={barChartData} options={optionsBarChart} />
            </div>

            <div className="w-1/2 mx-auto my-auto">
                <h3 className="text-center">Ratio of Tickets Sold per Event</h3>
                <Pie data={pieChartData} options={optionsPieChart} className="py-3" />
            </div>
        </div>
    );
}
