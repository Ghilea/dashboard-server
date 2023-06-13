export const dashboardStore = () => {

    let storeMap = new Map<string, Set<number | string>>();
    

    const register = (name: string): void => {
        storeMap.set(name, new Set<string>);
    }

    const add = (name: string, storeItem: number | string): void =>{
        storeMap.get(name)?.add(storeItem)
    }

    const remove = (name: string, storeItem: number | string): void => {
        storeMap.get(name)?.delete(storeItem)
    }

    const addedStoreObjectsToDashboard = (name: string): any => {
        return storeMap.get(name)?.values().next().value
    }

    return { register, add, remove, addedStoreObjectsToDashboard }

}