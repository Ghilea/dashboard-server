
import { defaultRepo } from "../repositories/defaultRepo";

export const defaultService = async () => {

    const { getUserApi, getDashboardObjects, updateDashboardCurrentDate, dbClose } = await defaultRepo();

    const retriveDashboardObjects = async (room: string) => {
        const update = await updateDashboardCurrentDate(room);
        let query = {data: []};
        if (update) {
            query = await getDashboardObjects(room);
        }
        
        await dbClose();

        return query;
    }

    const retriveUserApi = async () => {
        return await getUserApi();
    }

    return { retriveDashboardObjects, retriveUserApi }
}