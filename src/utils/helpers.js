//Create unique IDs
const uuid = require('uuid/v1');

//Creates id used for posts or comments
export const createUUID = () => {
    return uuid();
}

export const formatDate = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}