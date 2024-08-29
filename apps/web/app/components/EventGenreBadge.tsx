import { Badge } from "@radix-ui/themes";

interface Props {
    genre: string;
}

const genreMap: Record<string, { label: string; color: "blue" | "purple" | "red" | "green" | "yellow" }> = {
    ELECTRONIC: { label: "Electronic", color: "blue" },
    ROCK: { label: "Rock", color: "red" },
    JAZZ: { label: "Jazz", color: "purple" },
    HIPHOP: { label: "Hip Hop", color: "green" },
    POP: { label: "Pop", color: "yellow" },
};

const EventGenreBadge = ({ genre }: Props) => {
    const genreInfo = genreMap[genre] || { label: genre, color: "gray" };
    return <Badge color={genreInfo.color}>{genreInfo.label}</Badge>;
};

export default EventGenreBadge;
