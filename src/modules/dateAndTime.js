import dayjs from "dayjs";

export const formatDuration = (duration) => {
    const days = Math.floor(duration / (60 * 24));
    let hours = Math.floor(duration / 60) % 24;
    let minutes = duration % 60;

    return `${days > 0 ? `${days} d ` : ""}${hours > 0 ? `${hours} hr ` : ""}${minutes} min`;
};

export const formatToTime = (dateTime) => {
    return dayjs(dateTime).format("hh:mm A");
};

export const formatToDate = (dateTime) => {
    return dayjs(dateTime).format("YYYY-MM-DD");
};
