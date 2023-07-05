'use strict'

import * as dotenv from "dotenv";
import { initDb } from "./setup/setupConnection";
import fastify from "fastify";
import cors from "@fastify/cors";
import websocketPlugin from "@fastify/websocket";
import { setupRoutes } from "./setup/setupRoutes";
import websocket from "./websocket";

const server = async () => {

    dotenv.config();

    const { env } = process;
    env.TZ = 'Europe/Stockholm'

    const app = fastify({ logger: false });
    app.register(cors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    });

    app.register(websocketPlugin, {
        options: {
            clientTracking: true,
            maxPayload: 1048576,
        },
    });

    setupRoutes(app)

    app.register(ws => websocket(ws))

    const dbInitialized = await initDb(env);

    if (!dbInitialized) {
        app.log.error("Failed to start server, the database could probably not connect");
        process.exit(1)
    }

    const port = parseInt(env.PORT!)

    try {
        await app.listen({ port })

        console.log(`Server is running on port ${port}`);

    } catch (err) {
        app.log.error('server error: ', err)
        process.exit(1);
    }
}

server()