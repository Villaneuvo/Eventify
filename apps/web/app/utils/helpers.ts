export function formatDate(date1: Date) {
    const date = new Date(date1);

    // Opsi format tanggal
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long", // Menampilkan hari (Saturday)
        day: "numeric", // Menampilkan tanggal (12)
        month: "long", // Menampilkan bulan (December)
        year: "numeric", // Menampilkan tahun
        hour: "numeric", // Menampilkan jam
        minute: "numeric", // Menampilkan menit
        hour12: true, // Format 12 jam (AM/PM)
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", currencyFormatOptions).format(value);
}

export const currencyFormatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
};
