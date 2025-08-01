const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log('Usuário disse:', msg.toString());
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, () => {
  console.log('Backend rodando em http://localhost:3000');
});
