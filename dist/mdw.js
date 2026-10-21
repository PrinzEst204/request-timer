"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestTimer = void 0;
const requestTimer = (req, res, next) => {
    // 1. Record the starting timestamp
    const startTime = Date.now();
    // 2. Attach an event listener for when the response finishes
    res.on('finish', () => {
        // 3. Calculate the elapsed time
        const duration = Date.now() - startTime;
        // 4. Print the type-safe properties to the console
        console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });
    // 5. Pass control to the next middleware
    next();
};
exports.requestTimer = requestTimer;
