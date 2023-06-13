import { defaultController } from "../controllers/defaultController";

export const defaultRouter = async (app: any) => {

    const { test } = await defaultController();

    const setupRoutes = (): void => {
        app.get('/getTest', (req: any, res: any) => test(req, res))

    }

    return { setupRoutes }
}