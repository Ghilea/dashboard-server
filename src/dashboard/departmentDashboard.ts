import { DashboardObject } from "../types/types";
import { defaultService } from "../services/defaultService";

export const departmentDashboard = async (): Promise<DashboardObject[]> => {

    const { retriveUserApi } = await defaultService();

    return await Promise.all(
        [
            retriveUserApi()
        ]
    )
}