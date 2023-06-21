import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, handleUpload, uploadImage, authenticateToken, authenticateOwner } from '@/middlewares';
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  getTags,
  listProductByTitle,
  listProductsByCategory,
  listProductsByEmphasis,
  listProductsByLaunch,
  updateProduct,
} from '@/controllers';

const cartRouter = Router();

cartRouter
  .all('/*', authenticateToken)
  .get('/', getCategories)
  .post('/produtos', uploadImage, handleUpload, validateBody(createProductSchema), createProduct)
  .delete('/produtos/:id', deleteProduct);
export { cartRouter };
