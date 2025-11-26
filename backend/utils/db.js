const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const AUTOMATIONS_FILE = path.join(DATA_DIR, 'automations.json');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(AUTOMATIONS_FILE)) {
    fs.writeFileSync(AUTOMATIONS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify([], null, 2));
}

const readData = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${file}:`, error);
        return [];
    }
};

const writeData = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing to ${file}:`, error);
        return false;
    }
};

module.exports = {
    AUTOMATIONS_FILE,
    HISTORY_FILE,
    readData,
    writeData
};
