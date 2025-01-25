import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { signupSchema } from "./schema/users";

const app: Express = express();

app.use(express.json())
app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log : ["query"]
})

app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('App is working...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
