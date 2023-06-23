import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.PurchaseUncheckedCreateInput) {
  return await prisma.purchase.create({
    data,
  });
}

async function findById(id: number) {
  return prisma.purchase.findUnique({
    where: {
      id,
    },
    include: {
      cart: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
}

const purchaseRepository = {
  create,
  findById,
};

export default purchaseRepository;
