import { queryResults } from "../utiles/BaseRepo";
import { initDb } from "../setup/setupConnection";

export const defaultRepo = async () => {

    const { env } = process;
    const db = await initDb(env);

    const getDashboardObjects = async () => {
        const query = await db.raw(`
        SELECT title, val
        FROM dashboard`);

        return queryResults(query);
    }

    const getUserApi = async () => {
        const query = await db.raw(`
        SELECT title, api
        FROM user_api
        WHERE accepted = 1`);

        return queryResults(query);
    }

    const updateDashboardCurrentDate = async () => {
        await db.raw(`
        UPDATE dashboard AS a
        SET a.updated = NOW()
        WHERE a.id <> 0 AND updated <= NOW() - INTERVAL delay MINUTE`);

        const check = await db.raw(`SELECT ROW_COUNT() AS updated_rows;`);
        
        return queryResults(check);
    }

    const dbClose = async () => {
        await db.destroy();
    }
    return { getDashboardObjects, getUserApi, updateDashboardCurrentDate, dbClose }
}