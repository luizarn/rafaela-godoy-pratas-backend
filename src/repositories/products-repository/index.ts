import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByTitle(title: string, select?: Prisma.ProductSelect) {
  const params: Prisma.ProductFindUniqueArgs = {
    where: {
      title,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.product.findUnique(params);
}

async function create(data: Prisma.ProductUncheckedCreateInput) {
  console.log('chegou no reposiroy');
  const result = await prisma.product.create({
    data,
  });
  console.log(result);
  return result;
}

const productsRepository = {
  findByTitle,
  create,
};

export default productsRepository;
