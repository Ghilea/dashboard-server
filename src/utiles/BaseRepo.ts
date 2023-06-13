export const queryResults = (data: object) => {

    const howManyitemsExist = Object.keys(data).length

    switch (true) {
        case howManyitemsExist === 1:
            const standardType = data[0][Object.getOwnPropertyNames(data[0])];

            switch (standardType) {
                case Number.isInteger(standardType):
                    return Number(standardType);
                case 'true':
                    return true
                case 'false':
                    return false
                default:
                    return standardType
            }
        default:

            if (Array.isArray(data)) {
                return data
            }

            return data;
    }
}
