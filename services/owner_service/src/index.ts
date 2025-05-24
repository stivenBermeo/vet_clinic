import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', async (_req: Request, res: Response) => {
  const connectionUri = process.env.MONGODB_QUERY_STRING;
  const client = new MongoClient(connectionUri ?? '')
  await client.connect()
  const dbo = client.db('vet_clinic')
  const owners = await dbo.collection('owner').find({}).toArray()
  res.send({ owners });
});

app.post('/', async (req: Request, res: Response) => {
  const connectionUri = process.env.MONGODB_QUERY_STRING;
  const client = new MongoClient(connectionUri ?? '')
  await client.connect()
  const dbo = client.db('vet_clinic')

  await dbo.collection('owner').insertOne(req.body)
  const data = req.body
  res.send({ data });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});