import { DashboardObject } from "../types/types";
import { defaultService } from "../services/defaultService";

export const defaultDashboard = async (): Promise<DashboardObject[]> => {

    const { retriveTest, retriveTest2 } = await defaultService();

    return await Promise.all(
        [
            retriveTest(),
            retriveTest2()
        ]
    )
}