import { Request, Response, NextFunction } from 'express';

export const requestTimer = (req: Request, res: Response, next: NextFunction): void => {
  // 1. Record the starting timestamp
  const startTime: number = Date.now();

  // 2. Attach an event listener for when the response finishes
  res.on('finish', () => {
    // 3. Calculate the elapsed time
    const duration: number = Date.now() - startTime;
    
    // 4. Print the type-safe properties to the console
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  // 5. Pass control to the next middleware
  next();
};
