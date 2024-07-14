"use client"
import { useEffect, useState } from "react";
import StudentSidebar from "../Comps/Sidebar";
import { Event } from "../../utils/interfaces";
import StudentEventDetailModal from "../Modals/StudentEventDetailModal";
import StudentEventsFilteredList from "../Comps/StudentEvents";
import Loading from "../Loader/Loading";
import { fetchEventPicture, getEvents, getEventsJoinedByUser } from "@/utils/apiCalls";
import { userdepartment, userid } from "@/utils/data";


const JoinEvents = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const allEvents = await getEvents();
                const joinedEvents = await getEventsJoinedByUser(userid);
    
                const currentTime = new Date();
    
                const notJoinedEvents = allEvents.filter(event => 
                    !joinedEvents.some(joinedEvent => joinedEvent.id === event.id)
                );
    
                const upcomingEvents = notJoinedEvents.filter(event =>
                    new Date(event.eventEnds!).getTime() > currentTime.getTime() &&
                    event.department.includes(userdepartment!)
                );
    
                const processedEvents = await Promise.all(
                    upcomingEvents.map(async (event) => {
                        if (event.eventType && Array.isArray(event.eventType)) {
                            const eventTypeString = event.eventType[0];
                            event.eventType = eventTypeString.split(", ");
                        }
                        event.eventPicture = await fetchEventPicture(event.id!);
                        return event;
                    })
                );
    
                setEvents(processedEvents);
                setLoading(false);
            } catch (error) {
                console.error("Error loading events:", error);
                setError(true);
                setLoading(false);
            }
        };
    
        loadEvents();
    }, []);
    

    const removeJoinedEvent = (eventId: number) => {
        setEvents(events.filter(event => event.id !== eventId));
        window.location.reload()
    };

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <StudentSidebar />
            <div className="mt-2 mx-2">
                <p className="text-2xl mb-2 font-semibold tablet:text-3xl">{userdepartment} Events</p>
                <div className="mb-5">
                    <div className="relative mb-5 z-0">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" className="block w-full p-2 ps-10 border rounded-md" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <StudentEventsFilteredList events={events} searchTerm={searchTerm} onEventClick={handleEventClick} />
                </div>
            </div>
            {selectedEvent && <StudentEventDetailModal event={selectedEvent} onClose={handleClosePopup} onJoinUnjoin={removeJoinedEvent} />}

        </div>
    )
}

export default JoinEvents;
