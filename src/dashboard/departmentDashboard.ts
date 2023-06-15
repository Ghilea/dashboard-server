import { DashboardObject } from "../types/types";
import { defaultService } from "../services/defaultService";

export const departmentDashboard = async (): Promise<DashboardObject[]> => {

    const { retriveTest2 } = await defaultService();

    return await Promise.all(
        [
            retriveTest2()
        ]
    )
}