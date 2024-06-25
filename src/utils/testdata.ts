import { Event, User } from "./interfaces";

export const events: Event[] = [
    {
        id: 1,
        eventName: "CSS Workshop",
        eventPicture: "/card1.png",
        eventStarts: new Date("2024-06-10T10:00:00"),
        eventEnds: new Date("2024-06-10T13:00:00"),
        eventDescription: "Join us for an in-depth workshop on CSS fundamentals.",
        type: ["Workshop", "One-Time"],
        department: ["CCS", "CMBA"]
    },
    {
        id: 2,
        eventName: "Web Design Conference",
        eventPicture: "/card2.png",
        eventStarts: new Date("2024-06-15T14:00:00"),
        eventEnds: new Date("2024-06-15T17:00:00"),
        eventDescription: "Join us for an exciting conference on modern web design trends.Join us for an exciting conference on modern web design trends.Join us for an exciting conference on modern web design trends.Join us for an exciting conference on modern web design trends.",
        type: ["Conference", "Series"],
        department: ["CCS", "CASE"]
    },
    {
        id: 3,
        eventName: "JavaScript Hackathon",
        eventPicture: "/card3.png",
        eventStarts: new Date("2024-06-20T09:00:00"),
        eventEnds: new Date("2024-06-21T18:00:00"),
        eventDescription: "Participate in a thrilling hackathon and showcase your JavaScript skills.",
        type: ["Hackathon", "Series"],
        department: ["CCS", "CNAHS"]
    },
    {
        id: 4,
        eventName: "CSS Workshop",
        eventPicture: "/card1.png",
        eventStarts: new Date("2024-06-10T10:00:00"),
        eventEnds: new Date("2024-06-10T13:00:00"),
        eventDescription: "Join us for an in-depth workshop on CSS fundamentals.",
        type: ["Workshop", "One-Time"],
        department: ["CCS", "CMBA"]
    },
    {
        id: 5,
        eventName: "Web Design Conference",
        eventPicture: "/card2.png",
        eventStarts: new Date("2024-06-15T14:00:00"),
        eventEnds: new Date("2024-06-15T17:00:00"),
        eventDescription: "Join us for an exciting conference on modern web design trends.",
        type: ["Conference", "Series"],
        department: ["CCS", "CASE"]
    },
    {
        id: 6,
        eventName: "JavaScript Hackathon",
        eventPicture: "/card3.png",
        eventStarts: new Date("2024-06-20T09:00:00"),
        eventEnds: new Date("2024-06-21T18:00:00"),
        eventDescription: "Participate in a thrilling hackathon and showcase your JavaScript skills.",
        type: ["Hackathon", "Series"],
        department: ["CCS", "CNAHS"]
    }
];



export const users: User[] = [
    {
        id: 1,
        username: "john_doe",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        IdNumber: "123456789",
        department: "CCS",
        profilePicture: "defaultpic.png"
    },
    {
        id: 2,
        username: "jane_smith",
        password: "smith123",
        firstName: "Jane",
        lastName: "Smith",
        IdNumber: "987654321",
        department: "CCJ",
        profilePicture: "defaultpic.png"
    },
    {
        id: 3,
        username: "alice_wonder",
        password: "wonderland",
        firstName: "Alice",
        lastName: "Wonder",
        IdNumber: "456789123",
        department: "CEA",
        profilePicture: "defaultpic.png"
    },
    {
        id: 4,
        username: "bob_jones",
        password: "jones456",
        firstName: "Bob",
        lastName: "Jones",
        IdNumber: "789123456",
        department: "CMBA",
        profilePicture: "defaultpic.png"
    },
    {
        id: 5,
        username: "emma_smith",
        password: "emma789",
        firstName: "Emma",
        lastName: "Smith",
        IdNumber: "654321987",
        department: "CNAHS",
        profilePicture: "defaultpic.png"
    },
    {
        id: 6,
        username: "mike_adams",
        password: "mike001",
        firstName: "Mike",
        lastName: "Adams",
        IdNumber: "987654321",
        department: "CASE",
        profilePicture: "defaultpic.png"
    },
    {
        id: 7,
        username: "sarah_clark",
        password: "sarah123",
        firstName: "Sarah",
        lastName: "Clark",
        IdNumber: "987654321",
        department: "CCS",
        profilePicture: "defaultpic.png"
    },
    {
        id: 8,
        username: "david_brown",
        password: "david456",
        firstName: "David",
        lastName: "Brown",
        IdNumber: "123789456",
        department: "CCJ",
        profilePicture: "defaultpic.png"
    },
    {
        id: 9,
        username: "lisa_wilson",
        password: "lisa789",
        firstName: "Lisa",
        lastName: "Wilson",
        IdNumber: "456123789",
        department: "CEA",
        profilePicture: "defaultpic.png"
    },
    {
        id: 10,
        username: "test_user",
        password: "test123",
        firstName: "Test",
        lastName: "User",
        IdNumber: "555555555",
        department: "CMBA",
        profilePicture: "defaultpic.png"
    }
];

