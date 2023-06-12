import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, handleUpload, uploadImage, authenticateToken, authenticateOwner } from '@/middlewares';
import { createProduct, listProductByTitle, listProductsByCategory, updateProduct } from '@/controllers';

const productsRouter = Router();

productsRouter
  .get('/:category', listProductsByCategory)
  .get('/produtos/:title', listProductByTitle)
  .all('/*', authenticateToken)
  .post('/produtos', authenticateOwner, uploadImage, handleUpload, validateBody(createProductSchema), createProduct)
  .put('/produtos/:id', updateProduct);
export { productsRouter };
