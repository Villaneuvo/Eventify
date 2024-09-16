import prisma from "./client";
import * as bcrypt from "bcryptjs";

async function main() {
    const budiPasswordHash = await bcrypt.hash("budipass", 10);
    const alexPasswordHash = await bcrypt.hash("alexpass", 10);
    const joniPasswordHash = await bcrypt.hash("jonipass", 10);
    const adminPasswordHash = await bcrypt.hash("adminpass", 10);

    await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@gmail.com",
            password: adminPasswordHash,
            role: "ADMIN"
        },
    });

    const budi = await prisma.user.create({
        data: {
            name: "Budi",
            email: "budi@gmail.com",
            password: budiPasswordHash,
            role: "ORGANIZER",
        },
    });

    const alex = await prisma.user.create({
        data: {
            name: "Alex",
            email: "alex@gmail.com",
            password: alexPasswordHash,
            referralCode: "ABHZG143",
        },
    });

    const joni = await prisma.user.create({
        data: {
            name: "Joni",
            email: "joni@gmail.com",
            password: joniPasswordHash,
            referralCode: "GA6DTE7Y",
        },
    });

    await prisma.event.createMany({
        data: [
            {
                name: "Jazz & Blues Festival",
                description: "A night filled with jazz and blues.",
                genre: "JAZZ",
                date: new Date("2024-09-15T18:00:00Z"),
                location: "New Orleans, LA",
                availableTicket: 100,
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462049/zc5y5qyus8solbp2gb1o.jpg",
                price: 1500000,
                organizerId: budi.id,
            },
            {
                name: "Electronic Music Carnival",
                description: "Experience the best of electronic music.",
                genre: "ELECTRONIC",
                date: new Date("2024-10-20T20:00:00Z"),
                location: "Miami, FL",
                availableTicket: 100,
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462046/epyqc5pqps926qyqjazm.jpg",
                price: 2000000,
                organizerId: budi.id,
            },
            {
                name: "Rock Legends Reunion",
                description: "The ultimate rock music festival.",
                genre: "ROCK",
                date: new Date("2024-11-10T19:00:00Z"),
                location: "Los Angeles, CA",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462045/eb0cbvwmrdi76vzu4ebl.jpg",
                availableTicket: 100,
                price: 1800000,
                organizerId: budi.id,
            },
            {
                name: "Indie Folk Fest",
                description: "Celebrate the best of indie folk music.",
                genre: "INDIE",
                date: new Date("2024-08-05T17:00:00Z"),
                location: "Portland, OR",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462044/yv7oblwywasnr9nqzg7d.jpg",
                availableTicket: 100,
                price: 1400000,
                organizerId: budi.id,
            },
            {
                name: "Hip-Hop Beats Showcase",
                description: "Showcasing the best in hip-hop beats and culture.",
                genre: "HIPHOP",
                date: new Date("2024-07-25T19:00:00Z"),
                location: "Brooklyn, NY",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462041/op30ronod4jvxk3s3clk.jpg",
                availableTicket: 100,
                price: 1600000,
                organizerId: budi.id,
            },
            {
                name: "Classical Symphony Night",
                description: "A night of classical symphonies by renowned composers.",
                genre: "JAZZ",
                date: new Date("2024-09-30T18:00:00Z"),
                location: "Vienna, Austria",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462038/ki5fvmyccwmfeykdxbwk.jpg",
                availableTicket: 100,
                price: 2500000,
                organizerId: budi.id,
            },
            {
                name: "Pop Hits Extravaganza",
                description: "A celebration of the biggest pop hits.",
                genre: "POP",
                date: new Date("2024-10-05T20:00:00Z"),
                location: "Las Vegas, NV",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462037/hug4v4fch8v3vsdl66ai.jpg",
                availableTicket: 100,
                price: 2200000,
                organizerId: budi.id,
            },
            {
                name: "Reggae Summer Jam",
                description: "Feel the vibes at this reggae summer jam.",
                genre: "ROCK",
                date: new Date("2024-08-15T18:00:00Z"),
                location: "Kingston, Jamaica",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462035/lfgq0nmt8azbmbtejhyz.jpg",
                availableTicket: 100,
                price: 1200000,
                organizerId: budi.id,
            },
            {
                name: "Country Music Roundup",
                description: "A roundup of the best country music artists.",
                genre: "INDIE",
                date: new Date("2024-09-20T17:00:00Z"),
                location: "Nashville, TN",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462019/smykymmpozrzth839jlu.jpg",
                availableTicket: 100,
                price: 1300000,
                organizerId: budi.id,
            },
            {
                name: "Alternative Rock Fest",
                description: "An alternative rock music festival.",
                genre: "ROCK",
                date: new Date("2024-11-25T19:00:00Z"),
                location: "Seattle, WA",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462013/i3wcoen4xyuderlhzh6p.jpg",
                availableTicket: 100,
                price: 1900000,
                organizerId: budi.id,
            },
            {
                name: "Electronic Winter Wonderland",
                description: "A winter wonderland of electronic music.",
                genre: "ELECTRONIC",
                date: new Date("2024-12-15T20:00:00Z"),
                location: "Berlin, Germany",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462642/u2ayb3rtmf4xcboeoxjn.jpg",
                availableTicket: 100,
                price: 2100000,
                organizerId: budi.id,
            },
            {
                name: "Jazz in the Park",
                description: "Enjoy jazz music in a serene park setting.",
                genre: "JAZZ",
                date: new Date("2024-06-10T17:00:00Z"),
                location: "Chicago, IL",
                mainImage: "https://res.cloudinary.com/dkcur9nvf/image/upload/v1726462640/zgwm3mjscouoyfxfeqdz.jpg",
                availableTicket: 100,
                price: 1000000,
                organizerId: budi.id,
            },
        ],
    });

    await prisma.ticket.createMany({
        data: [
            {
                type: "GENERAL_ADMISSION",
                price: 1500000,
                eventId: (await prisma.event.findFirst({ where: { name: "Jazz & Blues Festival" } }))?.id!,
                userId: alex.id,
            },
            {
                type: "VIP",
                price: 2500000,
                eventId: (await prisma.event.findFirst({ where: { name: "Jazz & Blues Festival" } }))?.id!,
                userId: alex.id,
            },
            {
                type: "EARLY_BIRD",
                price: 1200000,
                eventId: (await prisma.event.findFirst({ where: { name: "Electronic Music Carnival" } }))?.id!,
                userId: alex.id,
            },
            {
                type: "GENERAL_ADMISSION",
                price: 1800000,
                eventId: (await prisma.event.findFirst({ where: { name: "Rock Legends Reunion" } }))?.id!,
                userId: joni.id,
            },
            {
                type: "VIP",
                price: 3000000,
                eventId: (await prisma.event.findFirst({ where: { name: "Rock Legends Reunion" } }))?.id!,
                userId: joni.id,
            },
        ],
    });

    await prisma.review.createMany({
        data: [
            {
                rating: 5,
                comment: "Amazing event! Loved the music and atmosphere.",
                userId: alex.id,
                eventId: (await prisma.event.findFirst({ where: { name: "Jazz & Blues Festival" } }))?.id!,
            },
            {
                rating: 4,
                comment: "Great lineup, but the venue was a bit crowded.",
                userId: alex.id,
                eventId: (await prisma.event.findFirst({ where: { name: "Electronic Music Carnival" } }))?.id!,
            },
            {
                rating: 3,
                comment: "Good event, but could have been better organized.",
                userId: joni.id,
                eventId: (await prisma.event.findFirst({ where: { name: "Rock Legends Reunion" } }))?.id!,
            },
        ],
    });

    await prisma.promotion.createMany({
        data: [
            {
                code: "PROMO30",
                discount: 0,
                validFrom: new Date("2024-09-01T00:00:00Z"),
                validUntil: new Date("2024-09-30T23:59:59Z"),
                eventId: (await prisma.event.findFirst({ where: { name: "Jazz & Blues Festival" } }))?.id!,
            },
            {
                code: "EARLYBIRD20",
                discount: 0.2,
                validFrom: new Date("2024-10-01T00:00:00Z"),
                validUntil: new Date("2024-10-15T23:59:59Z"),
                eventId: (await prisma.event.findFirst({ where: { name: "Electronic Music Carnival" } }))?.id!,
            },
            {
                code: "ROCKFAN30",
                discount: 0.3,
                validFrom: new Date("2024-11-01T00:00:00Z"),
                validUntil: new Date("2024-11-09T23:59:59Z"),
                eventId: (await prisma.event.findFirst({ where: { name: "Rock Legends Reunion" } }))?.id!,
            },
        ],
    });

    await prisma.merchandise.createMany({
        data: [
            {
                name: "Jazz Festival T-Shirt",
                description: "A stylish t-shirt to remember the Jazz festival.",
                price: 500000,
                stock: 100,
                eventId: (await prisma.event.findFirst({ where: { name: "Jazz & Blues Festival" } }))?.id!,
            },
            {
                name: "Electronic Music Poster",
                description: "A cool poster from the Electronic Music Carnival.",
                price: 300000,
                stock: 50,
                eventId: (await prisma.event.findFirst({ where: { name: "Electronic Music Carnival" } }))?.id!,
            },
            {
                name: "Rock Legends Cap",
                description: "A cap to show your love for rock music.",
                price: 200000,
                stock: 150,
                eventId: (await prisma.event.findFirst({ where: { name: "Rock Legends Reunion" } }))?.id!,
            },
        ],
    });

    const generalAdmissionTicket1 = await prisma.ticket.findFirst({
        where: { type: "GENERAL_ADMISSION", eventId: (await prisma.event.findFirst({ where: { name: "Jazz & Blues Festival" } }))?.id! },
    });

    const vipTicket1 = await prisma.ticket.findFirst({
        where: { type: "VIP", eventId: (await prisma.event.findFirst({ where: { name: "Jazz & Blues Festival" } }))?.id! },
    });

    const earlyBirdTicket2 = await prisma.ticket.findFirst({
        where: { type: "EARLY_BIRD", eventId: (await prisma.event.findFirst({ where: { name: "Electronic Music Carnival" } }))?.id! },
    });

    const generalAdmissionTicket3 = await prisma.ticket.findFirst({
        where: { type: "GENERAL_ADMISSION", eventId: (await prisma.event.findFirst({ where: { name: "Rock Legends Reunion" } }))?.id! },
    });

    const vipTicket3 = await prisma.ticket.findFirst({
        where: { type: "VIP", eventId: (await prisma.event.findFirst({ where: { name: "Rock Legends Reunion" } }))?.id! },
    });

    const merchandise1 = await prisma.merchandise.findFirst({
        where: { eventId: (await prisma.event.findFirst({ where: { name: "Jazz & Blues Festival" } }))?.id! },
    });

    const merchandise2 = await prisma.merchandise.findFirst({
        where: { eventId: (await prisma.event.findFirst({ where: { name: "Electronic Music Carnival" } }))?.id! },
    });

    const merchandise3 = await prisma.merchandise.findFirst({
        where: { eventId: (await prisma.event.findFirst({ where: { name: "Rock Legends Reunion" } }))?.id! },
    });

    if (!generalAdmissionTicket1 || !vipTicket1 || !earlyBirdTicket2 || !generalAdmissionTicket3 || !vipTicket3 || !merchandise1 || !merchandise2 || !merchandise3) {
        throw new Error("Required entity (ticket or merchandise) not found");
    }

    await prisma.transaction.createMany({
        data: [
            {
                amount: generalAdmissionTicket1.price,
                userId: alex.id,
                ticketId: generalAdmissionTicket1.id,
            },
            {
                amount: vipTicket1.price,
                userId: alex.id,
                ticketId: vipTicket1.id,
            },
            {
                amount: earlyBirdTicket2.price,
                userId: alex.id,
                ticketId: earlyBirdTicket2.id,
            },
            {
                amount: generalAdmissionTicket3.price,
                userId: joni.id,
                ticketId: generalAdmissionTicket3.id,
            },
            {
                amount: vipTicket3.price,
                userId: joni.id,
                ticketId: vipTicket3.id,
            },
            {
                amount: merchandise1.price,
                userId: alex.id,
                merchandiseId: merchandise1.id,
            },
            {
                amount: merchandise2.price,
                userId: joni.id,
                merchandiseId: merchandise2.id,
            },
            {
                amount: merchandise3.price,
                userId: joni.id,
                merchandiseId: merchandise3.id,
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
