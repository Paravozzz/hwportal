import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: string = "";
  socket: WebSocket;

  constructor() {
    // Create WebSocket connection.
    this.socket = new WebSocket('wss://localhost:7048/ws');

    //// Connection opened
    //socket.addEventListener('open', function (event) {
    //  socket.send('Hello Server!');
    //});

    //// Listen for messages
    //socket.addEventListener('message', function (event) {
    //  console.log('Message from server ', event.data);
    //});
  }

  send() {
    this.socket.send('Hello Server!');
  }

  load() {

  }
}
