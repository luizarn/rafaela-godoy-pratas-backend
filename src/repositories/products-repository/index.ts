import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getCategories() {
  return prisma.category.findMany();
}

async function getTags() {
  return prisma.tag.findMany();
}

async function getProducts() {
  return prisma.product.findMany({
    include: {
      Category: true,
      Tag: true,
    },
  });
}

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

async function listProductByTitle(title: string) {
  return prisma.product.findFirst({
    where: {
      title,
    },
  });
}

async function updateProduct(id: number, updatedFields: object) {
  return prisma.product.update({
    where: {
      id,
    },
    data: updatedFields,
  });
}
async function deleteProduct(id: number) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}

const productsRepository = {
  findByTitle,
  create,
  listProductsByCategory,
  listProductByTitle,
  updateProduct,
  deleteProduct,
  getCategories,
  getTags,
  getProducts,
};

export default productsRepository;
