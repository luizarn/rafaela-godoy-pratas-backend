import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, handleUpload, uploadImage, authenticateToken, authenticateOwner } from '@/middlewares';
import { createCartItem } from '@/controllers';

const cartRouter = Router();

cartRouter
  .all('/*', authenticateToken)
  // .get('/', getCategories)
  .post('/', createCartItem);
// .delete('/produtos/:id', deleteProduct);
export { cartRouter };
