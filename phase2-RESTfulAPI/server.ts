import { Request, Response, NextFunction } from 'express';
import productRoutes, { productRouter } from './product/productRouter';
import categoryRoutes, { categoryRouter } from './category/categoryRouter';
import userRouter from './user/userRouter';
import { basketRouter } from './basket/basketRouter';
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000; // Use the environment port or default to 3000

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use(categoryRouter);
app.use(productRouter);
app.use(userRouter);
app.use(basketRouter); // Assuming basketRouter handles its own path routing internally

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});