export default function logger(url) {
    return (url + " " + dateFormat(new Date()))
}

export function dateFormat(date) {
    return date.toLocaleString()
}