"use client";
import { useEffect, useRef, useState } from "react";
import { Event } from "../../utils/interfaces";
import AdminEventDetailModal from "../Modals/AdminEventDetailModal";
import { events } from "../../utils/testdata";
import Sidebar from "../Comps/Sidebar";

const ManageEvents = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<{ types: string[], departments: string[], classification: string[] }>({ types: [], departments: [], classification: [] });
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const types = Array.from(new Set(events.flatMap(event => event.type[0])));
    const classifications = Array.from(new Set(events.map(event => event.type[1])));
    const departments = Array.from(new Set(events.flatMap(event => event.department)));

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleFilterChange = (filterCategory: 'types' | 'departments' | 'classification', filterValue: string) => {
        const updatedFilters = selectedFilters[filterCategory].includes(filterValue)
            ? selectedFilters[filterCategory].filter(filter => filter !== filterValue)
            : [...selectedFilters[filterCategory], filterValue];
        setSelectedFilters({ ...selectedFilters, [filterCategory]: updatedFilters });
    };

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowFilters(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);
    };

    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFilters.types.length === 0 || selectedFilters.types.includes(event.type[0])) &&
        (selectedFilters.classification.length === 0 || selectedFilters.classification.includes(event.type[1])) &&
        (selectedFilters.departments.length === 0 || selectedFilters.departments.every(department => event.department.includes(department)))
    );

    return (
        <div>
            <Sidebar />
            <div className="mt-2 mx-2 mb-5">
                <p className="text-2xl font-semibold mb-2 tablet:text-3xl">Manage Events</p>
                <div>
                    <div className="flex items-center mb-5">
                        <div className="relative mr-3">
                            <div onClick={toggleFilters} className="cursor-pointer">
                                <img src="/filter.png" className="h-6 w-6" />
                            </div>
                            {showFilters && (
                                <div ref={dropdownRef} className="absolute top-10 left-0 bg-white border border-gray-200 shadow-md rounded-md p-2">
                                    <div className="flex items-center justify-between mb-2 flex-col">
                                        <button className="text-sm text-customYellow" onClick={() => setSelectedFilters({ types: [], departments: [], classification: [] })}>Clear Filters</button>
                                    </div>
                                    <div className="mb-2">
                                        <p className="font-semibold">Type</p>
                                        {types.map((type, index) => (
                                            <div key={index} className="flex items-center">
                                                <label className="flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={selectedFilters.types.includes(type)} onChange={() => handleFilterChange('types', type)} className="mr-2 cursor-pointer accent-customYellow" />
                                                    {type}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mb-2">
                                        <p className="font-semibold">Classification</p>
                                        {classifications.map((classification, index) => (
                                            <div key={index} className="flex items-center">
                                                <label className="flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={selectedFilters.classification.includes(classification)} onChange={() => handleFilterChange('classification', classification)} className="mr-2 cursor-pointer accent-customYellow" />
                                                    {classification}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="font-semibold">Departments</p>
                                        {departments.map((department, index) => (
                                            <div key={index} className="flex items-center">
                                                <label className="flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={selectedFilters.departments.includes(department)} onChange={() => handleFilterChange('departments', department)} className="mr-2 cursor-pointer accent-customYellow" />
                                                    {department}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" className="block w-full p-2 ps-10 border rounded-md" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                    <div className="tablet:flex tablet:justify-center tablet:gap-5 tablet:flex-wrap">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <div key={event.id} className="flex items-center border border-gray-200 rounded-md p-4 mt-2 tablet:flex-col tablet:text-center" onClick={() => handleEventClick(event)}>
                                    <img src={event.eventPicture} alt={event.eventName} className="w-16 h-16 object-cover rounded-md mr-4 tablet:mr-0 tablet:w-72 tablet:h-56 tablet:object-fill" />
                                    <div>
                                        <p className="font-semibold">{event.eventName}</p>
                                        <p className="text-gray-600">{new Date(event.eventStarts!).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <img src="no-event-image.png" className="mb-4 w-44 h-44" />
                                <p className="text-center">No event found. Please adjust your filters or try a different search term.</p>
                            </div>
                        )}
                        </div>
                </div>
            </div>
            {selectedEvent && <AdminEventDetailModal event={selectedEvent} onClose={handleClosePopup} />}
        </div>
    );
};

export default ManageEvents;
