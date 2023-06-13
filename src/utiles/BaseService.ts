import { Dashboard } from "../types/types"
export abstract class BaseService {
    protected dataObj(type: string, data: number | number[] | string | string[]): Dashboard {
        return {
            type,
            data
        }
    }
}
