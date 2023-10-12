export default class CustomError {
    static createError({
        name = "Error",
        cause,
        message,
        code
    }) {
        const error = new Error(message); // Proporciona un mensaje al constructor del Error
        error.name = name;
        error.code = code;
        error.cause = cause; 

        throw error;
    }
}

