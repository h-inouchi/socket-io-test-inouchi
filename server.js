'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

var counter = 0;

io.on('connection', (socket) => {
  counter++;
  console.log("counter:" + counter);

  socket.on('sendMsgFromClient', function(msg) {
    io.emit('sendMsgFromServer', '[Hello From Server]msg=' + msg);
  });

  console.log('Client connected');

  socket.on('disconnect', function() {
    counter--;
    console.log('disconnect.count: ', counter);
    console.log('Client disconnected');
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
