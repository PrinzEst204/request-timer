"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mdw_1 = require("./mdw"); // Adjust path as needed
const app = (0, express_1.default)();
// Register the middleware globally
app.use(mdw_1.requestTimer);
app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from TypeScript!" });
});
app.get('/api/slow', (req, res) => {
    setTimeout(() => {
        res.send("Delayed response");
    }, 150);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running in TS mode on port ${PORT}`);
});
