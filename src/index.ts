import express, { Router } from 'express'
import { router } from './router';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', router);

app.listen(port, () =>
  console.log(`REST API server ready on port ${port}`),
)