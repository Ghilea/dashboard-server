export interface Room {
    clients: Set<any>;
    intervalId: NodeJS.Timeout | null;
}

export interface DashboardObject {
    data: object[]
}