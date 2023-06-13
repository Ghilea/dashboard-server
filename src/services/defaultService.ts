
import { defaultRepo } from "../repositories/defaultRepo";

export const defaultService = async () => {

    const { getTest } = await defaultRepo();

    const retriveTest = async () => {
        const data = await getTest();
        return data;
    }

    return { retriveTest }
}