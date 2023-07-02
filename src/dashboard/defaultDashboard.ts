import { DashboardObject } from "../types/types";
import { defaultService } from "../services/defaultService";

export const defaultDashboard = async (): Promise<DashboardObject[]> => {

    const { retriveDashboardObjects } = await defaultService();

    return await Promise.all(
        [
            retriveDashboardObjects()
        ]
    )
}