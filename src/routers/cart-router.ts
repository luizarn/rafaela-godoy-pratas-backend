import { Router } from 'express';
import { validateBody, authenticateToken } from '@/middlewares';
import { createOrUpdateCartItem } from '@/controllers';
import { deleteCartItem, getCartItems } from '@/controllers/cart-controller';
import { createCartItemSchema } from '@/schemas/cartItem-schemas';

const cartRouter = Router();

cartRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(createCartItemSchema), createOrUpdateCartItem)
  .get('/user', getCartItems)
  .delete('/user/:id', deleteCartItem);

export { cartRouter };
