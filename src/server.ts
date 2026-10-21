import express, { Application, Request, Response } from 'express';
import { requestTimer } from './mdw'; // Adjust path as needed

const app: Application = express();

// Register the middleware globally
app.use(requestTimer);

app.get('/api/data', (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript!" });
});

app.get('/api/slow', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send("Delayed response");
  }, 150);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
