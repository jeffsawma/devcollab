import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io('https://devcollab-e6ac.onrender.com');

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  }
}
