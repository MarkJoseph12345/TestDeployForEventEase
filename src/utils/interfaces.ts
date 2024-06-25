export interface User {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    IdNumber?: string;
    department?: string;
    profilePicture?: string;
    role?: string;
}

export interface Event {
    id?: number;
    eventName: string;
    eventPicture: string;
    eventStarts: Date | null;
    eventEnds: Date | null;
    eventDescription: string;
    type: string[];
    department: string[];
}

export interface EventDetailModal {
    event: Event;
    onClose: () => void;
}


export interface FilteredEventListProps {
    events: Event[];
    searchTerm: string;
    onEventClick: (event: Event) => void;
}
