import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, handleUpload, uploadImage, authenticateToken, authenticateOwner } from '@/middlewares';
import { createProduct } from '@/controllers';

const productsRouter = Router();

productsRouter
  .all('/*', authenticateToken)
  .post('/', authenticateOwner, uploadImage, handleUpload, validateBody(createProductSchema), createProduct);

export { productsRouter };
