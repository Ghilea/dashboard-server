import { createRoom, addClient, removeClient, getClientCount, getRoom, addRoom, removeRoom } from "../models/clientTracker";
import { defaultDashboard } from "../dashboard/defaultDashboard";

const intervalTime = 5000;

const websocket = async (app: any) => {

    app.addHook("preValidation", async (req: { routerPath: string }, res: any) => {
        if (req.routerPath !== "/dashboard") return res.code(403).send("Connection rejected");
    });

    app.get("/dashboard", { websocket: true }, async (connection: { socket: any }, _: any) => {

        let roomName: string = "defaultDashboard";
        let room = await getRoom(roomName);

        if (!room) {
            room = createRoom();
            addRoom(room, roomName);
        }

        addClient(roomName, connection.socket);
        sendData(roomName);

        connection.socket.on("message", async (data: Buffer) => {
            removeClient(roomName, connection.socket);

            if (room) {
                if (getClientCount(room) === 0) {
                    stopSendData(roomName);
                    removeRoom(roomName);
                }
            }

            roomName = data.toString();
            room = await getRoom(roomName);
            
            if (!room) {
                room = createRoom();
                addRoom(room, roomName);
                addClient(roomName, connection.socket);
                sendData(roomName);
            } else {
                addClient(roomName, connection.socket);
            }
        });

        connection.socket.on("close", () => {
            if (room) {
                removeClient(roomName, connection.socket);

                console.log("Client disconnected from room: ", roomName, " - ", getClientCount(room), " clients left");
                if (getClientCount(room) === 0) {
                    stopSendData(roomName);
                    removeRoom(roomName);
                }
            }
        });
    });
};

export default websocket;

export const sendData = async (roomName: string) => {
    const room = await getRoom(roomName);

    if (room && !room.intervalId) {

        room.intervalId = setInterval(async () => {
            const data = await defaultDashboard(roomName);
            console.log("Sending data to room: ", roomName);
            for (const client of room.clients) {
                if (client.readyState === 1) {
                    client.send(JSON.stringify(data));
                }
            }
        }, intervalTime);
    }
}

export const stopSendData = async (roomName: string) => {
    const room = await getRoom(roomName);

    if (room && room.intervalId) {
        clearInterval(room.intervalId);
        room.intervalId = null;
    }
}