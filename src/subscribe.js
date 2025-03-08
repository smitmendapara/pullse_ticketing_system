const Ably = require('ably');
require('dotenv').config();

const ably = new Ably.Realtime({
  key: process.env.ABLY_API_KEY || '',
  logLevel: 2
});

const channel = ably.channels.get('tickets-updates');

channel.subscribe('ticket_created', (message) => {
  console.log('Received ticket create:', message.data);
});

channel.subscribe('ticket_updated', (message) => {
  console.log('Received ticket update:', message.data);
});