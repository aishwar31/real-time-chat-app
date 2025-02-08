const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../messages.json');

const saveMessage = async (message) => {
    try {
        let messages = await getMessages();
        messages.push({ text: message, timestamp: new Date() });

        await fs.writeFile(filePath, JSON.stringify(messages, null, 2));
    } catch (error) {
        console.error('Error saving message:', error);
    }
};

const getMessages = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []; // Return empty array if file doesn't exist
        }
        console.error('Error reading messages:', error);
        return [];
    }
};

module.exports = { saveMessage, getMessages };
