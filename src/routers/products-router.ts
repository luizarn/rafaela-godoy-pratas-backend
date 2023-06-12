import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, handleUpload, uploadImage, authenticateToken, authenticateOwner } from '@/middlewares';
import { createProduct, listProductsByCategory } from '@/controllers';

const productsRouter = Router();

productsRouter
  .get('/:category', listProductsByCategory)
  .all('/*', authenticateToken)
  .post('/produtos', authenticateOwner, uploadImage, handleUpload, validateBody(createProductSchema), createProduct);
export { productsRouter };
