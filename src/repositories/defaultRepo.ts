import { queryResults } from "../utiles/BaseRepo";

export const defaultRepo = async () => {

    const getTest = () => {
        const query = /* await */ ['test', 'test2'
        ]

        return queryResults(query);
    }

    return { getTest }

}