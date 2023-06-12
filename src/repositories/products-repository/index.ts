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

async function listProductsByCategory(category: string) {
  const result = await prisma.category.findFirst({
    where: {
      title: category,
    },
  });

  return prisma.product.findMany({
    where: {
      categoryId: result.id,
    },
  });
}

const productsRepository = {
  findByTitle,
  create,
  listProductsByCategory,
};

export default productsRepository;
