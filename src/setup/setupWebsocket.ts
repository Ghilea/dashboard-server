import { defaultDashboard } from "../dashboard/defaultDashboard";
import { departmentDashboard } from "../dashboard/departmentDashboard";
import { Room, createRoom, addClient, removeClient, getClientCount } from "../models/clientTracker";

const rooms: Map<string, Room> = new Map();
const intervalTime = 5000;

export const setupWebsocket = async (app: any) => {

    app.addHook("preValidation", async (req: { routerPath: string }, res: any) => {
        if (req.routerPath !== "/dashboard") return res.code(403).send("Connection rejected");
    });

    app.get("/dashboard", { websocket: true }, async (connection: { socket: any }, _: any) => {
        const dashboardRoom = "defaultDashboard";

        let room = rooms.get(dashboardRoom);
        if (!room) {
            room = createRoom();
            rooms.set(dashboardRoom, room);
            startSendingData(dashboardRoom);
        }

        addClient(room, connection.socket);

        console.log("Client connected");
        console.log("Connected clients:", getClientCount(room));

        connection.socket.on("close", () => {
            if (room) {

                removeClient(room, connection.socket);

                console.log("Client disconnected");
                console.log("Connected clients:", getClientCount(room));

                if (getClientCount(room) === 0) {
                    stopSendingData(dashboardRoom);
                }
            }
        });
    });
};

async function getDashboardType(room: string) {
    switch (room) {
        case "departmentDashboard":
            return await departmentDashboard();
        default:
            return await defaultDashboard();
    }
}

function sendDashboardData(room: Room, data: any) {
    for (const client of room.clients) {
        if (client.readyState === 1) {
            client.send(JSON.stringify(data));
        }
    }
}

function startSendingData(roomName: string) {

    const room = rooms.get(roomName);
    if (room && !room.intervalId) {
        room.intervalId = setInterval(async () => {
            const dashboardData = await getDashboardType(roomName);
            sendDashboardData(room, dashboardData);
        }, intervalTime);
    }
}

function stopSendingData(roomName: string) {
    const room = rooms.get(roomName);
    if (room && room.intervalId) {
        clearInterval(room.intervalId);
        room.intervalId = null;
    }
}