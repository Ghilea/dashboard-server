import { Room } from "../types/types";
import { createRoom, addClient, removeClient, getClientCount, getRoom, addRoom, removeRoom } from "../models/clientTracker";
import { defaultDashboard } from "../dashboard/defaultDashboard";

const intervalTime = 3000;

const websocket = async (app: any) => {

    app.addHook("preValidation", async (req: { routerPath: string }, res: any) => {
        if (req.routerPath !== "/dashboard") return res.code(403).send("Connection rejected");
    });

    app.get("/dashboard", { websocket: true }, async (connection: { socket: any }, _: any) => {

        let dashboardRoom: string = "defaultDashboard";

        const room = createRoom();
        addRoom(room, dashboardRoom);
        addClient(room, connection.socket);
        console.log(`Client connected (${getClientCount(room)})`);
        sendData(room, dashboardRoom);
        
        connection.socket.on("message", async (data: Buffer) => {
            stopSendData(room, dashboardRoom)
            dashboardRoom = data.toString();
            
            addRoom(room, dashboardRoom);
            sendData(room, dashboardRoom);
            
        });

        connection.socket.on("close", () => {
            if (room) {
                removeClient(room, connection.socket);

                console.log(`Client disconnected ${getClientCount(room)})`);

                if (getClientCount(room) === 0) {
                    console.log("No more clients in room, stopping sending data");
                    stopSendData(room, dashboardRoom);
                }
            }
        });
    });
};

export default websocket;

export const sendData = (room: Room, roomName: string) => {
    const gettinRoom = getRoom(room, roomName);

    if (gettinRoom && !room.intervalId) {

        room.intervalId = setInterval(async () => {
            const data = await defaultDashboard(roomName);
            for (const client of room.clients) {
                if (client.readyState === 1) {
                    client.send(JSON.stringify(data));
                }
            }
        }, intervalTime);
    }
}

export const stopSendData = (room: Room, roomName: string) => {
    const gettinRoom = getRoom(room, roomName);

    if (gettinRoom && room.intervalId) {
        clearInterval(room.intervalId);
        room.intervalId = null;
        removeRoom(room, roomName);
    }
}