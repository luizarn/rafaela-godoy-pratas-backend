import { notFoundError } from '@/errors';
import purchaseRepository from '@/repositories/purchase-repository';
import { Purchase } from '@prisma/client';

export type PurchaseParams = Omit<Purchase, 'createdAt' | 'updatedAt' | 'id' | 'date'>;

export async function create({ userId, cartId, total }: PurchaseParams): Promise<Purchase> {
  return purchaseRepository.create({ userId, cartId, total });
}

async function listPurchaseById(id: number) {
  const purchase = await purchaseRepository.findById(id);

  if (!purchase) throw notFoundError();

  return purchase;
}

const purchaseService = { create, listPurchaseById };

export default purchaseService;
