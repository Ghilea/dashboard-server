import { defaultDashboard } from "../dashboard/defaultDashboard";
import { departmentDashboard } from "../dashboard/departmentDashboard";

export const setupWebsocket = async (app: any) => {

    app.addHook("preValidation", async (req: { routerPath: string }, res: any) => {
        if (req.routerPath !== "/dashboard" && req.routerPath !== "/dashboard2") return res.code(403).send("Connection rejected");
    });

    app.get("/dashboard", { websocket: true }, async (connection: { socket: any }, _: any) => {
        return await getDashboard({ connection: connection });
    });

    app.get("/dashboard2", { websocket: true }, async (connection: { socket: any }, _: any) => {
        return await getDashboard({ connection: connection, dashboardType: "departmentDashboard", interval: 2000 });
    });
};

async function getDashboardType(dashboardType: string) {
    switch (dashboardType) {
        case "departmentDashboard":
            return await departmentDashboard();
        default:
            return await defaultDashboard();
    }
}

async function getDashboard({ connection, interval = 10000, dashboardType = "defaultDashboard" }) {

    const defaultDashboardInterval = setInterval(async () => {

        const buildObject = { "data": await getDashboardType(dashboardType) };

        connection.socket.send(JSON.stringify(buildObject));
    }, interval);

    connection.socket.on("close", () => {
        clearInterval(defaultDashboardInterval);
    });
}