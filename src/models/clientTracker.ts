import { Room } from "../types/types";

const rooms = new Map<string, Room>();

export function createRoom(): Room {
    return {
        clients: new Set(),
        intervalId: null
    };
}

export async function addClient(roomName: string, client: any): Promise<void> {
    const room = await getRoom(roomName);

    if (room) {
        room.clients.add(client);
        const clientCount = getClientCount(room);
        console.log(`Client connected (${clientCount}) to room "${roomName}"`);
    }
}

export async function removeClient(roomName, client: any): Promise<void> {
    const room = await getRoom(roomName);

    if (room) {
        room.clients.delete(client);
        const clientCount = getClientCount(room);
        console.log(`Client disconnected (${clientCount}) to room "${roomName}"`);
    }

}

export function getClientCount(room: Room): number {
    return room.clients.size;
}

export function addRoom(room: Room, roomName: string): void {
    rooms.set(roomName, room);
    console.log(`Room ${roomName} added`);
}

export async function getRoom(roomName: string): Promise<Room | undefined> {
    return rooms.get(roomName);
}

export function removeRoom(roomName: string): void {
    rooms.delete(roomName);
    console.log(`Room ${roomName} deleted`);
}