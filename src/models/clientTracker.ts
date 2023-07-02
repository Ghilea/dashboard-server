export interface Room {
    clients: Set<any>;
    intervalId: NodeJS.Timeout | null;
}

export function createRoom(): Room {
    return {
        clients: new Set(),
        intervalId: null
    };
}

export function addClient(room: Room, client: any): void  {
    room.clients.add(client);
}

export function removeClient(room: Room, client: any): void  {
    room.clients.delete(client);
}

export function getClientCount(room: Room): number {
    return room.clients.size;
}