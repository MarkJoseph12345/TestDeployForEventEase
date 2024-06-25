"use client";
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import Sidebar from '../Comps/Sidebar';
import Loading from '../Loader/Loading';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const ReportsAndAnalysis: React.FC = () => {
    const events: string[] = ['1', '5', '8', '22', '26'];
    const attendees: number[] = [150, 200, 180, 220, 170];

    const sortedAttendees: number[] = [...attendees].sort((a, b) => b - a);
    const top3Threshold: number = sortedAttendees[2];

    const barColors: string[] = attendees.map(attendee =>
        attendee >= top3Threshold ? '#000000' : '#FDCC01'
    );

    const barData = {
        labels: events,
        datasets: [
            {
                data: attendees,
                backgroundColor: barColors,
            },
        ],
    };

    const barOptions = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'gray',
                },
            },
            x: {
                grid: {
                    color: 'gray',
                },
            },
        },
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false
            },
        },
    };

    const doughnutData = {
        labels: ['Likes', 'Dislikes', 'Neutral'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    '#FDCC01',
                    '#000000',
                    '#4b5563',
                ],
            },
        ],
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 0);
    }, []);

    if (loading) {
        return <Loading />;
    }
    
    
    return (
        <div>
            <Sidebar />
            <div className="mt-5 mx-2 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-5">Reports and Analysis</h2>
                <div className="laptop:flex laptop:flex-wrap laptop:gap-5 laptop:items-center">
                    <div className="border-2 border-black w-full max-w-[24rem] mx-auto">
                        <h3 className='border-b-2 border-black bg-customYellow font-bold text-xl text-center'>TOP 3 NUMBER OF ATTENDEES</h3>
                        <div className="flex flex-col items-center justify-center my-2 gap-2">
                            <div className="flex justify-center items-center gap-1 w-full px-5">
                                <p className="min-w-12 text-center text-4xl text-customYellow font-bebas" style={{ textShadow: '3px 0px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>1st</p>
                                <p className="flex items-center justify-center rounded-full border border-black bg-customYellow box-border min-h-9 min-w-9 text-2xl font-bebas">30</p>
                                <div className="flex bg-customYellow w-full border border-black rounded items-center px-2 justify-between">
                                    <p className="text-lg font-bold">TECHTALK</p>
                                    <div className="flex items-center">
                                        <p className="font-bold text-lg">{sortedAttendees[0]}</p>
                                        <img src="/groupicon.png" className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-1 w-full px-5">
                                <p className="min-w-12 text-center text-3xl font-bebas">2nd</p>
                                <p className="flex items-center justify-center rounded-full border border-black bg-customYellow box-border min-h-9 min-w-9  text-2xl font-bebas">30</p>
                                <div className="flex w-full border border-black rounded items-center px-2 justify-between">
                                    <p className="text-lg font-bold">Event Name</p>
                                    <div className="flex items-center">
                                        <p className="font-bold text-lg">{sortedAttendees[1]}</p>
                                        <img src="/groupicon.png" className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-1 w-full px-5">
                                <p className="min-w-12 text-center text-2xl font-bebas">3rd</p>
                                <p className="flex items-center justify-center box-border rounded-full border border-black bg-customYellow box-border min-h-9 min-w-9 text-2xl font-bebas">30</p>
                                <div className="flex w-full border border-black rounded items-center px-2 justify-between">
                                    <p className="text-lg font-bold">Event Name</p>
                                    <div className="flex items-center">
                                        <p className="font-bold text-lg">{sortedAttendees[2]}</p>
                                        <img src="/groupicon.png" className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 w-full max-w-[24rem] mx-auto laptop:order-first">
                        <h3 className="text-xl font-bold">Monthly Events Attendance Data</h3>
                        <div className="mb-8 border-2 border-black rounded-xl px-4">
                            <h3 className="text-2xl font-medium mb-2 text-end underline font-bebas">{new Date().toLocaleString('default', { month: 'long' }).toUpperCase()}</h3>
                            <div className="flex items-center justify-center w-full">
                                <p className="[writing-mode:vertical-lr] rotate-180 mb-4  font-bebas">Number of Attendees</p>
                                <div className="inline">
                                    <Bar data={barData} options={barOptions} />
                                </div>
                            </div>
                            <p className="text-center font-bebas">Days of the Month</p>
                        </div>
                    </div>
                    <div className="border-2 border-black mb-5 w-full max-w-[24rem] mx-auto">
                        <h3 className="text-xl font-bold text-customYellow bg-black">FEEDBACKS</h3>
                        <div className=" py-10">
                            <Doughnut
                                data={doughnutData}
                                options={{
                                    plugins: {
                                        legend: {
                                            position: 'right',
                                            title: {
                                                display: true,
                                                text: 'Legend',
                                                color: '#000',
                                                font: {
                                                    size: 20
                                                }
                                            },
                                            labels: {
                                                color: '#000',
                                                font: {
                                                    size: 16
                                                }
                                            }
                                        },
                                    },
                                    aspectRatio: 2,
                                }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReportsAndAnalysis;
