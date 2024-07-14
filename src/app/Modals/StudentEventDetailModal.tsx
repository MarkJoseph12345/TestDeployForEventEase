"use client"
import React, { useEffect, useState } from 'react';
import type { EventDetailModal } from '@/utils/interfaces';
import { userid } from '@/utils/data';
import { getEventsJoinedByUser, joinEvent, unjoinEvent } from '@/utils/apiCalls';

const StudentEventDetailModal = ({ event, onClose }: EventDetailModal) => {
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        const checkIfJoined = async () => {
            try {
                const joinedEvents = await getEventsJoinedByUser(userid);
                const hasJoined = joinedEvents.some(joinedEvent => joinedEvent.id === event.id);
                setIsJoined(hasJoined);
            } catch (error) {
                console.error("Failed to check if user joined event:", error);
            }
        };
        checkIfJoined();
    }, [event.id, userid]);


    const handleJoinUnjoin = async () => {
        try {
            if (isJoined) {
                const success = await unjoinEvent(userid, event.id!);
                if (success) setIsJoined(false);
            } else {
                const success = await joinEvent(userid, event.id!);
                if (success) setIsJoined(true);
            }
        } catch (error) {
            console.error("Failed to join/unjoin event:", error);
        }
    };
    const type = event.eventType.toString().split(', ')
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-md shadow-md w-11/12 max-h-[95%] overflow-auto relative text-pretty tablet:max-w-[50rem]">
                <p className="sticky top-0 text-end text-gray-500 font-bold text-2xl cursor-pointer" onClick={onClose}>✖</p>
                <div className="flex flex-col items-center overflow-auto">
                    <div
                        className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 h-44 w-72">
                        <img src={event.eventPicture} alt={event.eventName} className="h-full w-full" />
                    </div>
                    <h2 className="text-xl font-semibold my-2 text-center">{event.eventName}</h2>
                    <p className="text-gray-600 mb-4 text-center">{event.eventDescription}</p>
                    <div className="flex items-center justify-between mb-4 gap-2 smartphone:flex-col smartphone:gap-0">
                        <p className="text-pretty text-center"><strong>Start Time:</strong> {event.eventStarts!.toLocaleString()}</p>
                        <p className="text-pretty text-center"><strong>End Time:</strong> {event.eventEnds!.toLocaleString()}</p>
                    </div>
                    <div className="">
                        <p className=""><strong>Event Type:</strong> {type[0]}</p>
                        <p className=""><strong>Event Classification:</strong> {type[1]}</p>
                        <p className=""><strong>Department(s):</strong> {event.department.join(', ')}</p>
                    </div>
                    <button
                        onClick={handleJoinUnjoin}
                        className="bg-customYellow font-poppins font-bold px-4 py-2 rounded-md mt-4 self-end">
                        {isJoined ? 'Unjoin' : 'Join'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentEventDetailModal;
