"use client"

import { useState } from "react";
import { Event } from "../../utils/interfaces";
import { events } from "../../utils/testdata";
import AdminEventDetailModal from "../Modals/AdminEventDetailModal";
import Sidebar from "../Comps/Sidebar";

const AdminDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };


  return (
    <div>
      <Sidebar />
      <div className="mt-2 mx-2 mb-4">
        <p className="text-2xl font-semibold tablet:text-3xl">Hello, admin</p>
        <p className="tablet:text-xl">Manage your events!</p>
        <div className="w-full border-t my-4" />
        <p className="text-2xl font-medium">Closest Events</p>
        <div className="tablet:flex tablet:justify-center tablet:gap-5 tablet:flex-wrap">
          {events.map(event => (
            <div key={event.id} className="flex items-center border border-gray-200 rounded-md p-4 mt-2 tablet:flex-col tablet:text-center" onClick={() => handleEventClick(event)}>
              <img src={event.eventPicture} alt={event.eventName} className="w-16 h-16 object-cover rounded-md mr-4 tablet:mr-0 tablet:w-72 tablet:h-56 tablet:object-fill" />
              <div>
                <p className="font-semibold">{event.eventName}</p>
                <p className="text-gray-600">{event.eventStarts!.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedEvent && <AdminEventDetailModal event={selectedEvent} onClose={handleClosePopup} />}
    </div>
  )
}

export default AdminDashboard;