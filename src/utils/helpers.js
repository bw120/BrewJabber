//Create unique IDs
const uuid = require('uuid/v1');

export const createUUID = () => {
    return uuid();
}