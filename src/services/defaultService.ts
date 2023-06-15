
import { defaultRepo } from "../repositories/defaultRepo";

export const defaultService = async () => {

    const { getTest, getTest2 } = await defaultRepo();

    const retriveTest = async () => {
        const data = await getTest();
        return {
            "type": "test1",
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

    return { retriveTest, retriveTest2 }
}