export const Response = () => {

    const OkRequest = (res, data: any): void => {
        res.send({
            success: true,
            ...data
        })
    }

    const BadRequest = (res, data: any): void => {
        res.send({
            success: false,
            message: 'Status 400',
            ...data
        })
    }

    return { OkRequest, BadRequest}

}