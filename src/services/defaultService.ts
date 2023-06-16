
import { defaultRepo } from "../repositories/defaultRepo";

export const defaultService = async () => {

    const { getUserApi, getTest2 } = await defaultRepo();

    const retriveUserApi = async () => {
        const data = await getUserApi();
        return {
            "type": "custom_user_api",
            "data": data
        };
    }

    const retriveTest2 = async () => {
        const data = await getTest2();
        return {
            "type": "test2",
            "data": data
        };;
    }

    return { retriveUserApi, retriveTest2 }
}