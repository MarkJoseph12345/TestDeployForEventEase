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

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    console.log('Search submitted:', searchValue);
    
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

  return (
    <Modal
      open={visible}
      onClose={onClose}
      aria-labelledby="join-event-modal-title"
      aria-describedby="join-event-modal-description"
    >
      <div className='bg-white p-4 rounded-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[48rem] relative h-[26rem]'>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <button type="submit" style={{ padding: '8px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
            <img
              src="/search.png"
              alt="Search"
             className='absolute w-6 ml-[1rem] -mt-[3.5px]'
              onClick={handleSearchSubmit}
            />
          </button>
          <img src='/filter.png' className='absolute mt-4 ml-[19rem]'></img>
          <input
            type="text"
            placeholder="Search events..."
            value={searchValue}
            onChange={handleSearchChange}
            className=' p-3 indent-5 w-[20rem] h-8 border-black border-[1.5px] rounded-2xl mt-4  text-[13px]'
          />
        </form>
        <Button onClick={onClose} style={{ color: 'black', fontSize: '25px', marginLeft: '43rem' , marginTop: '-6rem'}}>
         X
        </Button>
       
      </div>
    </Modal>
  );
};

export default JoinEventModal;