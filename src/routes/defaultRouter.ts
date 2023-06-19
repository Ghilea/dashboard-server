import { defaultController } from "../controllers/defaultController";

export const defaultRouter = async (app: any) => {

    const { userApi } = await defaultController();

    const setupRoutes = (): void => {
        app.get('/getTest', (req: any, res: any) => userApi(req, res))
    }

    return { setupRoutes }
}