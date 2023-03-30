import type { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    console.log(`url: ${url}`);
    console.log(`Method: ${method}`);
    next();
};
