export interface Event {
    id: string;
    name: string;
    description: string;
    genre: string;
    date: Date;
    location: string;
    price: number;
    availableTicket: number;
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

export interface Promotion {
    id: string;
    code: string;
    discount: number;
    validFrom: Date;
    validUntil: Date;
    usageCount: number;
    isEventSpecific: boolean;
    eventId: string;
    userId: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    referralCode: string;
    usedReferralCode: string;
    pointsEarned: number;
    pointsRedeemed: number;
    pointsExpiry: Date;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
    referralId: string;
}
