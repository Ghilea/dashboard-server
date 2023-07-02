import axios from 'axios';

export const queryResults = async (data: string | string[] | object) => {

    const dataObject = data[0];
    const itemCount = Object.keys(dataObject).length;

    if (itemCount === 1) {

        const firstItem = dataObject[0];

        if (firstItem.hasOwnProperty('updated_rows')) return firstItem.updated_rows ? true : false;
        if (firstItem.hasOwnProperty('title') && firstItem.hasOwnProperty('val')) return { title: firstItem.title, data: Number.isInteger(parseFloat(firstItem.val)) ? parseFloat(firstItem.val) : firstItem.val };

    }

    if (itemCount === 2) {
        if (Array.isArray(dataObject)) {

            const promisedData = dataObject.map((item: any) => {

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

    return dataObject;
    
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