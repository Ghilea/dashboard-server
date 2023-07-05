import { queryResults } from "../utiles/BaseRepo";
import { initDb } from "../setup/setupConnection";

export const defaultRepo = async () => {

    const { env } = process;
    const db = await initDb(env);

    const getDashboardObjects = async (room: string) => {
        const query = await db.raw(`
        SELECT dash.title, dash.val, dash.title FROM dashboard.dashboard as dash INNER JOIN rooms ON dash.room = rooms.id AND rooms.title = '${room}'`);

        return queryResults(query);
    }

    const getUserApi = async () => {
        const query = await db.raw(`
        SELECT title, api
        FROM user_api
        WHERE accepted = 1`);

        return queryResults(query);
    }

    const updateDashboardCurrentDate = async (room: string) => {
        await db.raw(`
        UPDATE dashboard AS dash
        INNER JOIN rooms ON dash.room = rooms.id AND rooms.title = '${room}'
        SET dash.updated = NOW()
        WHERE dash.id <> 0 AND dash.updated <= NOW() - INTERVAL dash.delay MINUTE`);

        const check = await db.raw(`SELECT ROW_COUNT() AS updated_rows;`);

        return queryResults(check);
    }

    const dbClose = async () => {
        await db.destroy();
    }
    return { getDashboardObjects, getUserApi, updateDashboardCurrentDate, dbClose }
}