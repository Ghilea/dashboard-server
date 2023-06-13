export const setupWebsocket = (app: any) => {
 
    /* app.addHook("preValidation", async (req: any, res: any) => {
        if (req.routerPath === "/ws" && !req.query.username) {
            res.code(403).send("Connection rejected");
        }
    }); */

    app.get('/ws', { websocket: true }, (connection, _) => {
        console.log(connection.socket)
        connection.socket.on('message', _ => {
            connection.socket.send('hi from server')
            //connection.socket.send(`Received message: ${message}`);
        });
    });

    /* app.get("/message-ws", { websocket: true }, (connection: any, _: any) => {

        const username = "TestUserName";
        console.log(`client connected ${username}`);

        const ClientBroadcastToAll = (message: any) => {
            app.websocketServer.clients.forEach(clientResponse => {
                clientResponse.send(JSON.stringify(message));
            });
        };

        const ServerBroadcastToAll = (message: any) => {
             app.websocketServer.clients.forEach(serverResponse => {
                 console.log(JSON.stringify(message));
                 serverResponse.send(JSON.stringify(message));
             });
        };

        //server send message
        connection.socket.on("message", (message: any) => {
            console.log('welcome to the server')
            message = JSON.parse(message.toString());
            ServerBroadcastToAll({
                sender: '_server',
                message: 'welcome to the server'
            });
        });
        
        ClientBroadcastToAll({
            sender: '__server',
            message: `${username} joined`
        })

        //broadcast incoming message
        connection.socket.on("message", (message: any) => {
            message = JSON.parse(message.toString());
            ClientBroadcastToAll({
                sender: username,
                ...message,
            });
        });

        //client send message
        connection.socket.on("message", (message: any) => {
            console.log(`Client message: ${message}`);
            ClientBroadcastToAll({
                sender: username,
                message: `${username} ${message}`
            });
        });

        //client leave
        connection.socket.on("close", () => {
            console.log("Client disconnected");
            ClientBroadcastToAll({
                sender: '__server',
                message: `${username} left`
            });
        });
    }); */
};