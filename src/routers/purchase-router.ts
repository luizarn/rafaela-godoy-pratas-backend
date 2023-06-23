import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPurchase, listPurchaseById } from '@/controllers';
import { createPurchaseSchema } from '@/schemas/purchase-schemas';

const purchaseRouter = Router();

purchaseRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(createPurchaseSchema), createPurchase)
  .get('/:id', listPurchaseById);

export { purchaseRouter };
