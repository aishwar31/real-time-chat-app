const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../messages.json');

// Ensure file exists, create if necessary
const ensureFileExists = async () => {
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, '[]'); // Initialize with an empty array
    }
};

// Initialize file on startup
ensureFileExists();

module.exports = { ensureFileExists };
