import { defaultService } from "../services/defaultService";
import { Response } from "../utiles/Response";

export const defaultController = async () => {

    const { OkRequest } = Response();

    const { retriveUserApi } = await defaultService();

    const userApi = async (_: any, res: any) => {
        const data = await retriveUserApi();
        OkRequest(res, { data: data })
    }

    return { userApi }

}