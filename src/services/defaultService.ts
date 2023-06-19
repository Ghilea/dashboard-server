
import { defaultRepo } from "../repositories/defaultRepo";

export const defaultService = async () => {

    const { getUserApi } = await defaultRepo();

    const retriveUserApi = async () => {
        const data = await getUserApi();
        return {
            "type": "custom_user_api",
            "data": data
        };
    }

    return { retriveUserApi }
}