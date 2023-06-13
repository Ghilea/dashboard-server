import { defaultService } from "../services/defaultService";
import { Response } from "../utiles/Response";

export const defaultController = async () => {

    const { OkRequest } = Response();

    const { retriveTest } = await defaultService();

    const test = async (_: any, res: any) => {
        const data = await retriveTest();
        OkRequest(res, { data: data })
    }

    return { test }

}