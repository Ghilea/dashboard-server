import { DashboardObject } from "../types/types";
import { defaultService } from "../services/defaultService";

export const defaultDashboard = async (): Promise<DashboardObject[]> => {

    const { retriveTest } = await defaultService();

    return await Promise.all(
        [
            retriveTest()
        ]
    )
}