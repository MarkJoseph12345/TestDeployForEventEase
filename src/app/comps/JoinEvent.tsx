'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';


interface EventCard {
  id: number;
  imageUrl: string;
  date: string;
  eventName: string;
  location: string;
  eventPicture: string;
  eventDescription: string;
  department: string;
  eventType: string;
  eventStarts: string;
  eventEnds: string;
}

const JoinEventModal = ({ visible, onClose }: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<EventCard[]>([]);
  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    const filtered = studentPageCards.filter(event =>
      event.eventName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const [popupEvent, setPopupEvent] = useState<EventCard | null>(null);

  const openPopup = (event: EventCard) => {
    setPopupEvent(event);
  };

  const closePopup = () => {
    setPopupEvent(null);
  };

  const [userid, setUserid] = useState<string | null>(null);
  const [studentPageCards, setStudentPageCards] = useState<EventCard[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<any[]>([]);
  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userid");
    setUserid(storedUserId);
    const department = window.localStorage.getItem("department");
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

                return {
                  ...event,
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

          const joinedResponse = await axios.get(`${API_ENDPOINTS.GET_EVENTS_JOINED_BY_USER}${storedUserId}`);

          if (joinedResponse.status === 200) {
            setJoinedEvents(joinedResponse.data);
          }
          const deptEvents = cardsWithPictures.filter((event: any) => {
            return event.department === department;
          });

          setStudentPageCards(deptEvents);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [loadingStates, setLoadingStates] = useState<boolean[]>(Array(studentPageCards.length).fill(false));
  const handleJoinEvent = async (userId: string | null, eventId: number, index: number) => {
    setLoadingStates(prevStates => {
      const updatedStates = [...prevStates]; // Create a copy of the loading states array
      updatedStates[index] = true; // Set the loading state of the specific event to true
      return updatedStates; // Return the updated loading states array
    });
    try {
      const response = await axios.post(`${API_ENDPOINTS.JOIN_EVENT}${userId}/${eventId}`);
      if (response.status === 200) {
        const joinedResponse = await axios.get(`${API_ENDPOINTS.GET_EVENTS_JOINED_BY_USER}${userid}`);

        if (joinedResponse.status === 200) {
          setJoinedEvents(joinedResponse.data);
        }
      } else {
        console.error('Failed to join event');
      }
    } catch (error) {
      console.error('Error joining event:', error);
    } finally {
      setLoadingStates(prevStates => {
        const updatedStates = [...prevStates];
        updatedStates[index] = false;
        return updatedStates;
      });
      window.location.reload()
    }
  };

  return (
    <Modal
      open={visible}
      onClose={onClose}
      aria-labelledby="join-event-modal-title"
      aria-describedby="join-event-modal-description"
    >
      <div className='bg-white p-4 rounded-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[70rem] min-h-[30rem] w-fit relative h-fit'>
        <div className="w-full flex justify-between items-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center border-black border-[2px] rounded-2xl px-2">
            <button type="submit" style={{ borderRadius: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
              <img
                src="/search.png"
                alt="Search"
                className='w-6'
                onClick={handleSearchSubmit}
              />

            </button>
            <input
              type="text"
              placeholder="Search events..."
              value={searchValue}
              onChange={handleSearchChange}
              className='w-[30rem] h-8  text-[13px] outline-none'
            />
            <img src='/filter.png' className=''></img>
          </form>
          <Button onClick={onClose} style={{ color: 'black', fontSize: '25px' }}>
            X
          </Button>
        </div>
        <div className="flex justify-center gap-4">
          {filteredEvents.map((card, index) => (
            <div key={index} className="border p-8 rounded-lg flex flex-col items-start gap-2 shadow-xl relative">
              <div className='self-center relative'>
                <img className="self-center h-[10.938rem] w-[15.625rem] object-fill" src={card.eventPicture} onClick={() => openPopup(card)} />
                <div className="absolute -mt-5 -ml-5 top-0 left-0 bg-customYellow rounded-full text-base w-16 h-16 font-bold flex justify-center items-center text-center flex-col">
                  <div>{new Date(card.eventStarts).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                  <div className='text-[12px]'>{new Date(card.eventStarts).getDate()}</div>
                </div>
              </div>
              <div className='flex flex-col'>
                <p>Event Name: {card.eventName}</p>
                <div className="flex items-center">
                  <p className="-ml-1.6">Time: {new Date(card.eventStarts).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - {new Date(card.eventEnds).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                </div>
              </div>
              <div className='self-end'>
                <button
                  className={` ${loadingStates[index] ? 'text-sm' : 'text-base'} font-bold rounded px-3 py-1 bg-customYellow `}
                  onClick={() => handleJoinEvent(userid, card.id, index)}
                  disabled={joinedEvents.some(event => event.id === card.id)}
                >
                  {loadingStates[index] ? "Joining..." : joinedEvents.some(event => event.id === card.id) ? "Joined" : "Join"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default JoinEventModal;