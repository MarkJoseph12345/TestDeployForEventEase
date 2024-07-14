"use client"
import { SetStateAction, useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Event, EventDetailModal } from '@/utils/interfaces';
import { deleteEvent, updateEvent, updateEventPicture } from '@/utils/apiCalls';

const departments = ['CEA', 'CMBA', 'CASE', 'CNAHS', 'CCS', 'CCJ'];

const ManageEvent = ({ event, onClose }: EventDetailModal) => {
    const [newPicture, setNewPicture] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(event.eventPicture || "");
    const [updateEventData, setUpdateEventData] = useState<any>({
        ...event,
        eventType: event.eventType ? event.eventType.toString().split(', ') : [],
        eventStarts: event.eventStarts ? new Date(event.eventStarts) : null,
        eventEnds: event.eventEnds ? new Date(event.eventEnds) : null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleCheckboxChange = (department: string) => {
        setUpdateEventData((prevEvent: { department: string[]; }) => {
            const updatedDepartments = prevEvent.department.includes(department)
                ? prevEvent.department.filter(dep => dep !== department)
                : [...prevEvent.department, department];
            updatedDepartments.sort();
            return {
                ...prevEvent,
                department: updatedDepartments,
            };
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setUpdateEventData((prevEvent: { eventType: any[]; }) => {
            if (name === 'eventType') {
                return {
                    ...prevEvent,
                    eventType: [value, prevEvent.eventType[1]],
                };
            } else if (name === 'classification') {
                return {
                    ...prevEvent,
                    eventType: [prevEvent.eventType[0], value],
                };
            } else {
                return {
                    ...prevEvent,
                    [name]: value,
                };
            }
        });
    };


    const filterStartPassedTime = (time: string | number | Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate!.getTime() < selectedDate.getTime();
    };

    const filterEndPassedTime = (time: string | number | Date) => {
        const currentDate = new Date(event.eventStarts!);
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setNewPicture(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            setUpdateEventData((prevEvent: any) => ({
                ...prevEvent,
                eventStarts: date,
            }));
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            setUpdateEventData((prevEvent: any) => ({
                ...prevEvent,
                eventEnds: date,
            }));
        }
    };


    const handleUpdateEvent = async () => {
        if (event.id === undefined) {
            alert("Event ID is not defined.");
            return;
        }
    
        const updatedEventData = {
            ...updateEventData,
            eventPicture: newPicture || event.eventPicture, 
        };
        const result = await updateEvent(event.id, updatedEventData);

        if(newPicture instanceof File) {
            await updateEventPicture(event.id, newPicture);
        }

        if (result) {
            window.location.reload();
        } else {
            console.log("Failed to update event.");
        }
    };
    

    const handleDeleteEvent = async () => {
        if (event.id === undefined) {
            alert("Event ID is not defined.");
            return;
        }
        const success = await deleteEvent(event.id);
        if (success) {
            alert("Event deleted successfully.");
            window.location.reload();
        } else {
            alert("Failed to delete event.");
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-2 rounded-md shadow-md w-11/12 max-h-[95%] overflow-auto relative laptop:max-w-[50rem]">
                <div className="flex justify-end sticky top-0">
                    <span className="text-gray-500 font-bold text-2xl z-10 cursor-pointer" onClick={onClose}>✖</span>
                </div>
                <p className="text-2xl font-poppins font-bold text-center">Manage Event</p>
                <div className="min-h-10 rounded-2xl mt-4 border-2 p-2 bg-customWhite  flex flex-col gap-5 ">
                    <div className="relative w-full flex flex-col items-center justify-center h-fit">
                        {preview &&
                            <div
                                className="h-44 w-72">
                                <img src={preview || event.eventPicture} className="h-full w-full object-contain" />
                            </div>
                        }
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        <button onClick={() => fileInputRef.current && fileInputRef.current.click()} className="bg-customYellow font-poppins font-bold px-4 py-2 rounded-md mt-4">Change Event Image</button>
                    </div>
                    <div className="relative w-full max-w-[24rem] mx-auto tablet:max-w-[90%]">
                        <input placeholder="Event Name"
                            name="eventName"
                            defaultValue={updateEventData.eventName}
                            onChange={handleInputChange}
                            className="peer h-full w-full rounded-[7px] border border-black border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-black placeholder-shown:border-t-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Event Name <span className="text-customRed">*</span>
                        </label>
                    </div>
                    <div className="relative w-full max-w-[24rem] mx-auto tablet:max-w-[90%]">
                        <input placeholder="Event Type"
                            name="eventType"
                            defaultValue={event.eventType.toString().split(', ')[0]}
                            onChange={handleInputChange}
                            className="peer h-full w-full rounded-[7px] border border-black border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-black placeholder-shown:border-t-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Event Type <span className="text-customRed">*</span>
                        </label>
                    </div>
                    <div className="relative w-full max-w-[24rem] mx-auto tablet:max-w-[90%]">
                        <textarea placeholder="Event Description"
                            name="eventDescription"
                            defaultValue={updateEventData.eventDescription}
                            onChange={handleInputChange}
                            className="peer h-32 w-full rounded-[7px] border border-black border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-black placeholder-shown:border-t-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Event Description <span className="text-customRed">*</span>
                        </label>
                    </div>
                    <div className="relative flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md self-center tablet:max-w-[90%]">
                        <p className="m-2">Department(s)</p>
                        <nav className="flex flex-wrap gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                            {departments.map((department, index) => (
                                <div key={index} role="button"
                                    className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                    <label htmlFor={`horizontal-list-${department}`} className="flex items-center w-full px-3 py-2 cursor-pointer">
                                        <div className="grid mr-3 place-items-center">
                                            <div className="inline-flex items-center">
                                                <label className="relative flex items-center p-0 rounded-full cursor-pointer"
                                                    htmlFor={`horizontal-list-${department}`}>
                                                    <input id={`horizontal-list-${department}`} type="checkbox"
                                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                                        checked={updateEventData.department.includes(department)}
                                                        onChange={() => handleCheckboxChange(department)}
                                                    />
                                                    <span
                                                        onClick={() => handleCheckboxChange(department)}
                                                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                                            stroke="currentColor" strokeWidth="1">
                                                            <path fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                            {department}
                                        </p>
                                    </label>
                                </div>
                            ))}
                        </nav>
                    </div>
                    <div className="relative flex w-full max-w-[24rem] mx-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md tablet:max-w-[90%]">
                        <p className="m-2">Event Classification</p>
                        <nav className="flex justify-center w-full font-sans text-base font-normal text-blue-gray-700">
                            <div role="button"
                                className="flex items-center  w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <label htmlFor="horizontal-list-react" className="flex justify-center items-center w-full py-2 cursor-pointer">
                                    <div className="grid mr-3 place-items-center">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center p-0 rounded-full cursor-pointer"
                                                htmlFor="horizontal-list-react">
                                                <input name="classification"
                                                    value="One-Time"
                                                    onChange={handleInputChange}
                                                    checked={updateEventData.eventType.toString().split(', ')[1] === "One-Time" || updateEventData.eventType[1] === "One-Time"}
                                                    id="horizontal-list-react" type="radio"
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
                                                <span
                                                    className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <p className=" font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-400">
                                        One-Time
                                    </p>
                                </label>
                            </div>
                            <div role="button"
                                className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <label htmlFor="horizontal-list-vue" className="flex justify-center items-center  w-full px-3 py-2 cursor-pointer">
                                    <div className="grid mr-3 place-items-center">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="horizontal-list-vue">
                                                <input name="classification"
                                                    value="Series"
                                                    onChange={handleInputChange}
                                                    checked={updateEventData.eventType.toString().split(', ')[1] === "Series" || updateEventData.eventType[1] === "Series"} id="horizontal-list-vue" type="radio"
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
                                                <span
                                                    className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <p className=" font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-400">
                                        Series
                                    </p>
                                </label>
                            </div>
                        </nav>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div>
                            <p>Start Date</p>
                            <DatePicker
                                showIcon
                                selected={updateEventData.eventStarts}
                                onChange={(date) => handleStartDateChange(date)}
                                showTimeSelect
                                timeFormat="h:mm aa"
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                filterTime={filterStartPassedTime}
                                minDate={new Date()}
                                placeholderText="Start Date"
                                className="bg-white border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <p>End Date</p>
                            <DatePicker
                                disabled={updateEventData.eventStarts === null}
                                showIcon
                                selected={updateEventData.eventEnds}
                                onChange={(date) => handleEndDateChange(date)}
                                showTimeSelect
                                timeFormat="h:mm aa"
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={updateEventData.eventStarts}
                                filterTime={filterEndPassedTime}
                                placeholderText="End Date"
                                className="bg-white border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 self-end">
                        <button className="bg-customRed text-white font-poppins font-bold px-4 py-2 rounded-md mt-4" onClick={handleDeleteEvent}>Delete Event</button>
                        <button className="bg-customYellow font-poppins font-bold px-4 py-2 rounded-md mt-4" onClick={handleUpdateEvent}>Update Event</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ManageEvent;