"use client"
import React, { useState } from 'react';
import type { EventDetailModal } from '@/utils/interfaces';
import ManageEvent from './ManageEvent';
import ViewFeedback from './ViewFeedback';
import { formatDate } from '@/utils/data';

const AdminEventDetailModal = ({ event, onClose }: EventDetailModal) => {
    const [clickedManage, setClickedManage] = useState(false);
    const [clickedFeedback, setClickedFeedback] = useState(false);
    const type = event.eventType.toString().split(', ')

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-md shadow-md w-11/12 max-h-[95%] overflow-auto relative text-pretty tablet:max-w-[50rem]">
                <div className="flex justify-end">
                    <span className="sticky text-gray-500 font-bold text-2xl cursor-pointer" onClick={onClose}>✖</span>
                </div>
                <div className="flex flex-col items-center overflow-auto">
                    <div
                        className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 h-44 w-72">
                        <img src={event.eventPicture} alt={event.eventName} className="h-full w-full" />
                    </div>
                    <h2 className="text-xl font-semibold my-2 text-center">{event.eventName}</h2>
                    <p className="text-gray-600 mb-4 text-center">{event.eventDescription}</p>
                    <div className="flex items-center justify-between mb-4 gap-2">
                        <p className="text-pretty text-center"><strong>Start Time:</strong> {formatDate(event.eventStarts)}</p>
                        <p className="text-pretty text-center"><strong>End Time:</strong> {formatDate(event.eventEnds)}</p>
                    </div>
                    <p className="text-center"><strong>Event Type:</strong> {type[0]}</p>
                    <p className="text-center"><strong>Event Classification:</strong> {type[1]}</p>
                    <p className="text-center"><strong>Department(s):</strong> {event.department.join(', ')}</p>
                    <div className="self-end flex gap-3">
                        <button className="bg-customYellow font-poppins font-bold px-4 py-2 rounded-md mt-4" onClick={() => { setClickedFeedback(true) }}>View Feedbacks</button>
                        <button className="bg-customYellow font-poppins font-bold px-4 py-2 rounded-md mt-4" onClick={() => { setClickedManage(true) }}>Manage</button>
                    </div>
                </div>
            </div>
            {clickedManage && <ManageEvent event={event} onClose={() => setClickedManage(false)} />}
            {clickedFeedback && <ViewFeedback event={event} onClose={() => setClickedFeedback(false)} />}
        </div>
    );
};

export default AdminEventDetailModal;
