'use client'

interface EventCard {
    imageUrl: string;
    date: string;
    eventName: string;
    location: string;
    eventStartsDate: string;
    eventStartsHour: string;
    eventPicture: string;
    eventDescription: string;
    department: string;
    eventType: string;
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../api';

const EventPopup = ({ event, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-[4px] z-50">
            <div className="bg-white p-8 rounded-3xl relative flex flex-col items-center">
                <button className="absolute top-0 right-0 px-2 py-1 font-black text-4xl" onClick={onClose}>X</button>
                <div className='relative'>
                    <img className="min-h-[100px] min-w-[100px] object-fill" src={event.eventPicture} />
                    <div className="absolute -mt-5 -ml-5 top-0 left-0 bg-customYellow rounded-full text-sm font-bold w-12 h-12 flex justify-center items-center text-center flex-col">
                        <div>{new Date(event.eventStartsDate).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                        <div>{new Date(event.eventStartsDate).getDate()}</div>
                    </div>
                </div>
                <div className="w-[500px] h-[200px] border-4 rounded-3xl border-customYellow p-4">
                    <div className="flex flex-col items-center">
                        <p className="underline font-bold text-2xl">{event.eventName}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold">Event Details: <span className="font-normal">{event.eventDescription}</span></p>
                        <p className="font-bold">Event Type: <span className="font-normal">{event.eventType}</span></p>
                        <p className="font-bold">Department: <span className="font-normal">{event.department}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminEventCards = () => {

    const [popupEvent, setPopupEvent] = useState<EventCard | null>(null);

    const openPopup = (event: EventCard) => {
        setPopupEvent(event);
    };

    const closePopup = () => {
        setPopupEvent(null);
    };


    const [adminPageCards, setAdminPageCards] = useState<EventCard[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.GET_ALL_EVENTS);
                if (response.status >= 200 && response.status < 300) {
                    const data = response.data;
                    const cardsWithPictures = await Promise.all(data.map(async (event: any) => {
                        try {
                            const imgResponse = await axios.get(`${API_ENDPOINTS.GET_EVENT_PICTURE}${event.id}`, {
                                responseType: 'arraybuffer'
                            });
                            if (imgResponse.status >= 200 && imgResponse.status < 300) {
                                const base64Image = Buffer.from(imgResponse.data, 'binary').toString('base64');
                                const eventStartsDate = new Date(event.eventStarts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                                const eventStartsHour = new Date(event.eventStarts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                                return {
                                    ...event,
                                    eventStartsDate,
                                    eventStartsHour,
                                    eventPicture: `data:image/png;base64,${base64Image}`
                                };
                            } else {
                                return event;
                            }
                        } catch (error) {
                            console.error(`Error fetching image for event with ID ${event.id}:`, error);
                            return event;
                        }
                    }));
                    setAdminPageCards(cardsWithPictures);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-4 max-w-[90%] mx-auto">
                {adminPageCards.map((card, index) => (
                    <div key={index} className="border p-8 rounded-lg flex flex-col items-start gap-4 shadow-xl relative">
                        <div className='self-center relative'>
                            <img className="self-center min-h-[250px] min-w-[250px] object-fill" src={card.eventPicture} />
                            <div className="absolute -mt-5 -ml-5 top-0 left-0 bg-customYellow rounded-full text-2xl w-20 h-20 font-bold flex justify-center items-center text-center flex-col">
                                <div>{new Date(card.eventStartsDate).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                                <div>{new Date(card.eventStartsDate).getDate()}</div>
                            </div>

                        </div>
                        <div className='flex flex-col'>
                            <p>Event Name: {card.eventName}</p>
                            <div className="flex items-center">
                                <img src="time.png" className="h-4 w-4" alt="Time Icon" />
                                <p className="ml-2">Time: {card.eventStartsHour}</p>
                            </div>
                        </div>
                        <div className='self-end'>
                            <button className='font-bold rounded px-3 py-1 bg-customYellow' onClick={() => openPopup(card)}>View</button>
                        </div>
                    </div>
                ))}
            </div>
            {popupEvent && <EventPopup event={popupEvent} onClose={closePopup} />}
        </div>
    );
};



export default AdminEventCards;