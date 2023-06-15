import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, handleUpload, uploadImage, authenticateToken, authenticateOwner } from '@/middlewares';
import {
  createProduct,
  deleteProduct,
  getCategories,
  getTags,
  listProductByTitle,
  listProductsByCategory,
  updateProduct,
} from '@/controllers';

const productsRouter = Router();

productsRouter
  .get('/categories', getCategories)
  .get('/tags', getTags)
  .get('/:category', listProductsByCategory)
  .get('/produtos/:title', listProductByTitle)
  .all('/*', authenticateToken)
  .all('/*', authenticateOwner)
  .post('/produtos', uploadImage, handleUpload, validateBody(createProductSchema), createProduct)
  .put('/produtos/:id', updateProduct)
  .delete('/produtos/:id', deleteProduct);
export { productsRouter };
