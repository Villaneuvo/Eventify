export interface Event {
    id: string;
    name: string;
    description: string;
    genre: string;
    date: Date;
    location: string;
    price: number;
    availableTickets: number;
    createdAt: Date;
    updatedAt: Date;
    mainImage: string;
    additionalImages: string[];
    organizerId: string;
    organizer: Organizer;
    tickets: Ticket[];
    reviews: Review[];
}

export interface Ticket {
    id: string;
    type: string;
    price: number;
    issuedAt: Date;
    redeemed: boolean;
    eventId: string;
    userId: string;
}

export interface Organizer {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    referralCode: string;
    pointsEarned: number;
    pointsRedeemed: number;
    pointsExpiry: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    userId: string;
    eventId: string;
}
