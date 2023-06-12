import { Product } from '@prisma/client';
import { duplicatedTitleError } from './errors';
import productsRepository from '@/repositories/products-repository';

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

async function validateUniqueTitleOrFail(title: string) {
  const productWithSameEmail = await productsRepository.findByTitle(title);
  if (productWithSameEmail) {
    throw duplicatedTitleError();
  }
}

const productsService = {
  createProduct,
};

export * from './errors';
export default productsService;
