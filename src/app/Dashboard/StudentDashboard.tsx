"use client"

import { useEffect, useState } from "react";
import { Event, User } from "../../utils/interfaces";
import StudentEventDetailModal from "../Modals/StudentEventDetailModal";
import Sidebar from "../Comps/Sidebar";
import { fetchEventPicture, getEvents, getUserById } from "@/utils/apiCalls";
import { formatDate, userdepartment, userid } from "@/utils/data";


const StudentDasboard = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const fetchedUser = await getUserById(userid);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userid]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await getEvents();

        if (Array.isArray(fetchedEvents) && fetchedEvents.length === 0) {
          setError(true);
        } else {
          setError(false);

          const currentTime = new Date();

          const processedEvents = await Promise.all(
            fetchedEvents.map(async (event) => {
              if (event.eventType && Array.isArray(event.eventType)) {
                const eventTypeString = event.eventType[0];
                event.eventType = eventTypeString.split(", ");
              }
              event.eventPicture = await fetchEventPicture(event.id!);
              return event;
            })
          );

          const upcomingEvents = processedEvents.filter(
            (event) =>
              new Date(event.eventEnds!).getTime() > currentTime.getTime() &&
              event.department.includes(userdepartment!)
          );

          const sortedEvents = upcomingEvents.sort((a, b) =>
            new Date(a.eventStarts!).getTime() - new Date(b.eventStarts!).getTime()
          );

          const closestEvents = sortedEvents.slice(0, 3);

          setEvents(closestEvents);
        }
      } catch (error) {
        console.error("Error loading events:", error);
        setError(true);
      }
    };

    loadEvents();
  }, [userdepartment]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Sidebar />
      <div className="mt-2 mx-2 mb-4">
        <p className="text-2xl font-semibold tablet:text-3xl">Hello, {user.firstName}</p>
        <p className="tablet:text-xl">Discover exciting events for your department!</p>
        <div className="w-full border-t my-4" />
        <p className="text-2xl font-medium">Closest {userdepartment} Events</p>
        <div className="tablet:flex tablet:justify-center tablet:gap-5 tablet:flex-wrap">
          {error ? (
            <div className="flex flex-col items-center gap pt-2">
              <img src="no-event-image.png" alt="No events today" className="mb-4 w-32 h-32" />
              <p className="font-poppins text-center text-gray-700 mx-4">Oops! Looks like there are no events found.</p>
            </div>
          ) : (
            events.map(event => (
              <div
                key={event.id}
                className="flex items-center border border-gray-200 rounded-md p-4 mt-2 tablet:flex-col tablet:text-center"
                onClick={() => handleEventClick(event)}
              >
                <img
                  src={event.eventPicture}
                  alt={event.eventName}
                  className="w-16 h-16 object-cover rounded-md mr-4 tablet:mr-0 tablet:w-72 tablet:h-56 tablet:object-fill"
                />
                <div>
                  <p className="font-semibold">{event.eventName}</p>
                  <p className="text-gray-600">{formatDate(event.eventStarts)}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
      {selectedEvent && <StudentEventDetailModal event={selectedEvent} onClose={handleClosePopup} />}
    </div>
  )
}

export default StudentDasboard;