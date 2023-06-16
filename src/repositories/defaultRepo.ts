import { queryResults } from "../utiles/BaseRepo";
import { initDb } from "../setup/setupConnection";

export const defaultRepo = async () => {
   
    const { env } = process;
    const db = await initDb(env);

    const getUserApi = async () => {
        const query = await db.select("api")
            .from("user_api")
            .where("accepted", "=", 1);

        return queryResults(query);
    }

    const getTest2 = async () => {
        const query = /* await */['this is test2', 'yepp'
        ]

        return queryResults(query);
    }

    return { getUserApi, getTest2 }

}