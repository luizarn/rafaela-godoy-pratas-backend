import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, authenticateToken } from '@/middlewares';
import { createCartItem } from '@/controllers';
import { getCartItems } from '@/controllers/cart-controller';

const cartRouter = Router();

cartRouter.all('/*', authenticateToken).post('/', createCartItem).get('/user', getCartItems);

export { cartRouter };
