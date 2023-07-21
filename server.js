"use strict";

const express = require('express');
const http = require('http');
let WebSocketServer = require('ws').Server;

let port = 8080;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// let wsServer = new WebSocketServer({ port: port });
const ip = require('ip');
console.log('WebSocket Broadcaster Started - ' + 'ws://' + ip.address() + ':' + port);

// Define a route handler for the root path ("/")
app.get('/', (req, res) => {
    res.send('Hello, this is the homepage!');
});

wss.on('connection', function (ws) 
{
    console.log('## WebSocket Connection ##');

    ws.on('message', function (message) 
    {
        console.log('## Message Recieved ##');
        const json = JSON.parse(message.toString());
        console.log('\t' + message.toString());

        wss.clients.forEach(function each(client) {
            if (isSame(ws, client))
            {
                console.log('## Skipping Sender ##');
            }
            else 
            {
                client.send(message);
            }
        });
    });

});
//tests
function isSame(ws1, ws2) {
    return (ws1 === ws2);
}

// Start the server and listen on port 4000
const expressPort = 3000;
server.listen(expressPort, () => {
    console.log(`Express server listening on http://localhost:${expressPort}`);
});