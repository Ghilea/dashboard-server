import { queryResults } from "../utiles/BaseRepo";

export const defaultRepo = async () => {

    const getTest = () => {
        const query = /* await */ ['test', 'test2'
        ]

        return queryResults(query);
    }

    const getTest2 = () => {
        const query = /* await */['this is test2', 'yepp'
        ]

        return queryResults(query);
    }

    return { getTest, getTest2 }

}