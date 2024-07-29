

exports.getErrorMsgs = (err) => {
    const errsMsgs = []

    err.errors?.forEach(error => {
        switch(error.type) {
            case "unique violation":
                errsMsgs.push({
                    msg: "Valor já cadastrado",
                    path: error.path
                })
            break
            default:
                errsMsgs.push({
                    msg: error.message,
                    path: error.path
                })
            break
        }
    });

    return errsMsgs
}

