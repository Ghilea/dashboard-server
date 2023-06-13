'use strict'

import * as dotenv from "dotenv";
import { initDb } from "./setup/setupConnection";
import fastify from "fastify";
import cors from "@fastify/cors";
import websocketPlugin from "@fastify/websocket";

import { setupRoutes } from "./setup/setupRoutes";
import { setupWebsocket } from "./setup/setupWebsocket";

const server = async () => {

    dotenv.config();

    const { env } = process;
    env.TZ = 'Europe/Stockholm'

    const app = fastify({ logger: false });

    app.register(cors, {});

    app.register(websocketPlugin, {
        /* handle: (connection: any, _: any) => { 
            connection.pipe(connection)
        }, */
        connectionOptions: {
            
        },
        options: {
            maxPayload: 1048576,
        },
    });

    setupRoutes(app)
    setupWebsocket(app)

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