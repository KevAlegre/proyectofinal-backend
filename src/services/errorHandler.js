import EErrors from "./CustomError/dictionary.js";
export default (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case EErrors.INVALID_PRODUCTS_PARAMS:
            res.send({status: "Error", message: error.name});
            break;
        case EErrors.INVALID_USER_PARAMS:
            res.send({status: "Error", message: error.name});
            break;
        default:
            res.send({status: "Error", message: "Unhandled error"});
            break;
    };
};