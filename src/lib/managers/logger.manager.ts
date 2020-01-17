'use strict';

import winston from 'winston';

namespace Logger {

  const logger: winston.Logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'qualweb.log' })
    ]
  });

  export function logError(message: string): void {
    logger.error(message);
  }
}

export = Logger;
