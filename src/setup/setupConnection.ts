import Knex from "knex";

const isEnvOk = (env: NodeJS.ProcessEnv) => {
    if (
        env.MYSQL_HOST === undefined ||
        env.MYSQL_NAME === undefined ||
        env.MYSQL_USER === undefined ||
        env.MYSQL_PASSWORD == undefined ||
        env.PORT === undefined
    ) {
        return false
    }
    return true;
}

export const initDb = async (env: NodeJS.ProcessEnv): Promise<any> => {
    if (!isEnvOk(env)) return false;

    const { MYSQL_HOST, MYSQL_NAME, MYSQL_USER, MYSQL_PASSWORD } = env

    const db = Knex({
        client: "mysql2",
        connection: {
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_NAME
        },
        pool: {
            min: 2,
            max: 10
        }
    });
   
    await db.raw('SELECT 1');
    return db;
};
