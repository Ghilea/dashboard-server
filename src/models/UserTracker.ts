export const UserTracker = () => {
    
    const roomMap = new Map<string,Set<string>>();
    
    const register = (roomName: string): void => {
        roomMap.set(roomName, new Set<string>);
    }

    const add = (roomName: string, socketId: string): void => {
        roomMap.get(roomName)?.add(socketId)
    }

    const remove = (roomName: string, socketId: string): void => {
        roomMap.get(roomName)?.delete(socketId)
    }

    const connectedUsersToRoom = (room: string): number => {
        console.log('roommap:', roomMap)
        return roomMap.get(room)?.size ?? 0
    }

    return {register, add, remove, connectedUsersToRoom}

}