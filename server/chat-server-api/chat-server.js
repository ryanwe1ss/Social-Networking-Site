require('dotenv').config({ path: '../../.env' });
const { database } = require('../database/database');

const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const url = require('url');

const chatApi = express();
const chatRooms = new Map();
const server = http.createServer(chatApi);

const createWebSocketServer = (temporaryChatId) => {
  const wss = new WebSocket.Server({ noServer: true });
  chatRooms.set(temporaryChatId, wss);

  wss.on('connection', (ws, request) => {
    ws.on('message', (body) => {
      body = JSON.parse(body);

      database.query(
        'INSERT INTO messages (chat_id, to_user, from_user, message) VALUES ($1, $2, $3, $4)',
        [body.chat_id, body.to_user, body.from_user, body.message],
        
        (error, results) => {
          if (error) console.log('Error saving message to database: ', error);
        }
      );

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(body));
        }
      });
    });

    ws.on('close', () => {
      if (wss.clients.size === 0) {
        chatRooms.delete(temporaryChatId);
      }
    });
  });

  return wss;
};

server.on('upgrade', (request, socket, head) => {
  const query = url.parse(request.url, true).query;
  const chatId = query.chatId;
  const wss = chatRooms.get(chatId) || createWebSocketServer(chatId);

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(process.env.CHAT_SERVER_PORT, () => {
  console.log(`Chat Server API listening on port ${process.env.CHAT_SERVER_PORT}`);
});