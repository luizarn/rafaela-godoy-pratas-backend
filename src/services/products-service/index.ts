import { Product } from '@prisma/client';
import { duplicatedTitleError } from './errors';
import productsRepository from '@/repositories/products-repository';
import { notFoundError } from '@/errors';

export type ProductParams = Omit<Product, 'createdAt' | 'updatedAt' | 'id'>;

export async function createProduct({
  title,
  description,
  price,
  categoryId,
  tagId,
  size,
  publicUrl,
}: ProductParams): Promise<Product> {
  await validateUniqueTitleOrFail(title);

  return productsRepository.create({
    title,
    description,
    price,
    categoryId,
    tagId,
    size,
    publicUrl,
  });
}

async function listProductsByCategory(category: string) {
  const products = await productsRepository.listProductsByCategory(category);

  if (!products) throw notFoundError();

  return products;
}

async function validateUniqueTitleOrFail(title: string) {
  const productWithSameEmail = await productsRepository.findByTitle(title);
  if (productWithSameEmail) {
    throw duplicatedTitleError();
  }
}

const productsService = {
  createProduct,
  listProductsByCategory,
};

export * from './errors';
export default productsService;
