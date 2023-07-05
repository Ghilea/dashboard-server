export interface Room {
    clients: Set<any>;
    intervalId: NodeJS.Timeout | null;
    rooms: Map<string, Room>;
}

export interface DashboardObject {
    data: object[]
}