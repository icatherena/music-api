/* import express, { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'http-status';

export class HttpError extends Error {
    status: number;
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
    }
}

export function errorHandler (err: HttpError, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    // Determine the appropriate status code based on the error
    const statusCode = err.status || 500;
    // Send the error response to the client
    res.status(statusCode).json({ message: err.status + ": " + err.message });
} */