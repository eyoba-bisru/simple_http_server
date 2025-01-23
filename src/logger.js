export default function logger(url) {
    return (url + " " + dateFormat(new Date()))
}

function dateFormat(date) {
    return date.toLocaleString()
}