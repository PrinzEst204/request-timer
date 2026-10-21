import express, { Application, Request, response, Response } from 'express';
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

app.post('/birthday', (req:Request, res:Response) => {
  const day = Number(req.body?.day);
  const month = Number(req.body?.month);

  //Validate against a leap year so 29 februray is accepted

  const check = new Date(2000, month - 1, day );

  if(
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    check.getMonth() !== month - 1 ||
    check.getDate() !== day
  ) {
    res.status(400).send()
    return;
  }

  const now =new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);

  if (nextBirthday < today ) {
     nextBirthday = new Date(today.getFullYear() + 1, month - 1, day );
  }

  //Math.round guards against daylight-saving hour shifts
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.round((nextBirthday.getTime() - today.getTime()) / msPerDay);

  if (daysLeft === 0 ) {
    res.send('Happpy Birthday! Today is your special day!')
    return
  }
  res.send(`only ${daysLeft} day ${daysLeft} days ${daysLeft === 1 ? '' : 's'} left until your next birthday!`);
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
