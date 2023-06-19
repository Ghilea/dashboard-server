import axios from 'axios';

export const queryResults = async (data: string | string[] | object) => {

    const itemCount = Object.keys(data).length;

    if (itemCount === 1) {
        const firstItem = data[0];

        const type = firstItem[Object.getOwnPropertyNames(firstItem)];

        if (Number.isInteger(type)) return parseInt(type);
        return type;
    }

    if (itemCount === 2) {
        if (Array.isArray(data)) {

            const promisedData = data.map((item: any) => {

                if (isValidHttpUrl(item.api)) {
                    return axios.get(item.api).then(({ data }) => {
                        return { title: item.title, data: data }
                    })
                } else {
                    return { title: item.title, data: item.api }
                }

            });

            return await Promise.all(promisedData).then((data) => {
                return data;
            });

        }
    }

    return data;
    
}

function isValidHttpUrl(string: string) {
    let url: URL;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}