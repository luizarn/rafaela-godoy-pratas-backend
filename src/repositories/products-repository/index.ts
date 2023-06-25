import { Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { notFoundError } from '@/errors';

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

async function findByTitle(title: string) {
  return prisma.product.findUnique({
    where: {
      title,
    },
  });
}

async function create(data: Prisma.ProductUncheckedCreateInput) {
  const result = await prisma.product.create({
    data,
  });
  return result;
}

async function listProductsByCategory(category: string) {
  const result = await prisma.category.findFirst({
    where: {
      title: category,
    },
  });

  if (!result) {
    throw notFoundError();
  }

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
    data: {
      ...updatedFields,
    },
  });
}
async function deleteProduct(id: number) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}

async function listProductsByEmphasis() {
  return prisma.product.findMany({
    where: {
      emphasis: true,
    },
  });
}

async function listProductsByLaunch() {
  return prisma.product.findMany({
    where: {
      launch: true,
    },
  });
}

async function updateProductByCart(id: number, quantityChange: number) {
  return prisma.product.update({
    where: {
      id,
    },
    data: { quantity: { [quantityChange > 0 ? 'increment' : 'decrement']: Math.abs(quantityChange) } },
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
  listProductsByLaunch,
  listProductsByEmphasis,
  updateProductByCart,
};

export default productsRepository;
