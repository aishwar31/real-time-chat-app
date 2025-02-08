const WebSocket = require('ws');
const { saveMessage, getMessages } = require('./controllers/chatController');

const wss = new WebSocket.Server({ port: 5000 });

const clients = new Set();

wss.on('connection', async (ws) => { // Triggered when a new client connects to the WebSocket server.
    console.log('Client connected');
    clients.add(ws);

    const messages = await getMessages();
    ws.send(JSON.stringify({ type: 'history', messages })); // Sends a message from server to client.

    ws.on('message', async (message) => { // Triggered when the server receives a message from a client.
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === 'chat') {
            await saveMessage(parsedMessage.text);

            // Broadcast the message to all connected clients
            const outgoingMessage = JSON.stringify({ type: 'chat', text: parsedMessage.text });
            clients.forEach(client => { // An array of all connected clients.
                if (client.readyState === WebSocket.OPEN) {
                    client.send(outgoingMessage);
                }
            });
        }
    });

    ws.on('close', () => { // Triggered when a client disconnects.
        console.log('Client disconnected');
        clients.delete(ws);
    });
});

console.log('WebSocket server running on ws://localhost:5000');
