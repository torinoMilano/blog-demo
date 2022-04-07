import winston from 'winston';
import {format, transports} from "winston";
import path from 'path';
import * as process from "process";

const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

export const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        format.label({label: path.basename(process?.mainModule?.filename || '.')}),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.metadata({fillExcept: ['message', 'level', 'timestamp', 'label']}),
        winston.format.colorize(),
        winston.format.json(),
        winston.format.splat()
    ),
    defaultMeta: {service: 'blog-service'},
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        //new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //new winston.transports.File({ filename: 'combined.log' }),

        // will use elastic kibana
        new transports.Console({
            format: format.combine(
                format.colorize(),
                logFormat
            )
        }),
    ],
    handleExceptions: true,
    exitOnError: false
});
logger.log('info', `Start logging`);