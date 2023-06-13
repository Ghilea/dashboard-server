import { Response } from "../utiles/Response";
import { defaultRouter } from "../routes/defaultRouter";
export const setupRoutes = async (app: any) => {

    const { OkRequest } = Response();
    const { setupRoutes } = await defaultRouter(app);

    app.get('/', (_: any, res: any) => OkRequest(res, {
        message: "..."
    }))

    setupRoutes()
}