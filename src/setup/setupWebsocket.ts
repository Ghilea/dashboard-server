import { defaultDashboard } from "../dashboard/defaultDashboard";
import { departmentDashboard } from "../dashboard/departmentDashboard";

export const setupWebsocket = async (app: any) => {

    app.addHook("preValidation", async (req: { routerPath: string }, res: any) => {
        if (req.routerPath !== "/dashboard" && req.routerPath !== "/dashboard2") {
            res.code(403).send("Connection rejected");
        }
    });

    app.get("/dashboard", { websocket: true }, (connection: { socket: any }, _: any) => {
        getDashboard(connection);
    });

    app.get("/dashboard2", { websocket: true }, (connection: { socket: any }, _: any) => {
        getDashboard(connection, "departmentDashboard");
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

async function getDashboard(connection, dashboardType: string = "default") {

    const interval = 3000;

    //broadcast incoming message
    const defaultDashboardInterval = setInterval(async () => {

        const buildObject = { "data": await getDashboardType(dashboardType) };

        connection.socket.send(JSON.stringify(buildObject));
    }, interval);

    //client leave
    connection.socket.on("close", () => {
        clearInterval(defaultDashboardInterval);
    });
}