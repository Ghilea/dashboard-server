import axios from 'axios';

export const queryResults = async (data: object) => {

    const itemCount = Object.keys(data).length

    switch (true) {
        case itemCount === 1:

            const type = data[0][Object.getOwnPropertyNames(data[0])];

            switch (type) {
                case Number.isInteger(type):
                    return parseInt(type);
                case 'true':
                    return true
                case 'false':
                    return false
                default:
                    if (isValidHttpUrl(type)) {
                        return await axios.get(type).then((response) => {
                            return response.data
                        }).catch((error) => { console.error(error) })
                    }
                    return type
            }
        default:
            return data;
    }
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
