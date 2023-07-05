import { Room } from "../types/types";

export function createRoom(): Room {
    return {
        clients: new Set(),
        rooms: new Map(),
        intervalId: null
    };
}

export function addClient(room: Room, client: any): void {
    room.clients.add(client);
}

export function removeClient(room: Room, client: any): void {
    room.clients.delete(client);
}

export function getClientCount(room: Room): number {
    return room.clients.size;
}

export function addRoom(room: Room, roomName: string): void {
    room.rooms.set(roomName, createRoom());
}

export function getRoom(room: Room, roomName: string): Room | undefined {
    return room.rooms.get(roomName);
}

export function removeRoom(room: Room, roomName: string): void {
    room.rooms.delete(roomName);
}