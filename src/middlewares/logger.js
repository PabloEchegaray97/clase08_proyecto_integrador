import winston from 'winston'

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

const isProd = process.env.APP_ENV === 'development'
    
export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.printf(info => {
            const formatted_date = new Date().toLocaleString()
            return `${formatted_date} [${info.level.toUpperCase()}] - ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            level: isProd ? 'debug' : 'info'
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
        })
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger
    
    req.logger.info(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`)

    next()
}