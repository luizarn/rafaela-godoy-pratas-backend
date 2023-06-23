import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createPurchase, listPurchaseById } from '@/controllers';

const purchaseRouter = Router();

purchaseRouter.all('/*', authenticateToken).post('/', createPurchase).get('/:id', listPurchaseById);

export { purchaseRouter };
