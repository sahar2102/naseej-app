import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class TransportGateway {
  @WebSocketServer()
  server: Server;

  // When a bus driver sends their location
  @SubscribeMessage('update_location')
  handleLocationUpdate(@MessageBody() data: { busId: string, lat: number, lng: number }) {
    // Broadcast to all students watching this bus
    this.server.emit(`bus_location_${data.busId}`, data);
    
    // In a real app, we would also save this to Redis for persistence
    console.log(`Bus ${data.busId} moved to ${data.lat}, ${data.lng}`);
  }
}
