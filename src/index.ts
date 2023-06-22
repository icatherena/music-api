import express, { Router } from 'express'
import { router } from './router';

// import { errorHandler } from './utils/errors';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', router);

// Global error handling middleware
// app.use(errorHandler);

app.listen(port, () =>
  console.log(`REST API server ready on port ${port}`),
)