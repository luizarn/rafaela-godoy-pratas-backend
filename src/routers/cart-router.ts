import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, authenticateToken } from '@/middlewares';
import { createOrUpdateCartItem } from '@/controllers';
import { deleteCartItem, getCartItems } from '@/controllers/cart-controller';

const cartRouter = Router();

cartRouter
  .all('/*', authenticateToken)
  .post('/', createOrUpdateCartItem)
  .get('/user', getCartItems)
  .delete('/user/:id', deleteCartItem);

export { cartRouter };
