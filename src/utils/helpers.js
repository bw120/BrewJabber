//Create unique IDs
const uuid = require('uuid/v1');

export const createUUID = () => {
    return uuid();
}

export const formatDate = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}