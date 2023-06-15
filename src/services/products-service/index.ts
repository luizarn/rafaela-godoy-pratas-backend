import { Product } from '@prisma/client';
import { duplicatedTitleError } from './errors';
import productsRepository from '@/repositories/products-repository';
import { notFoundError } from '@/errors';

export type ProductParams = Omit<Product, 'createdAt' | 'updatedAt' | 'id'>;

async function getCategories() {
  const categories = await productsRepository.getCategories();

  if (!categories) throw notFoundError();

  return categories;
}

async function getTags() {
  const tags = await productsRepository.getTags();

  if (!tags) throw notFoundError();

  return tags;
}

export async function createProduct({
  title,
  description,
  price,
  categoryId,
  tagId,
  size,
  publicUrl,
  quantity,
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
    quantity,
  });
}

async function validateUniqueTitleOrFail(title: string) {
  const productWithSameEmail = await productsRepository.findByTitle(title);
  if (productWithSameEmail) {
    throw duplicatedTitleError();
  }
}

async function listProductsByCategory(category: string) {
  const products = await productsRepository.listProductsByCategory(category);

  if (!products) throw notFoundError();

  return products;
}

async function listProductByTitle(title: string) {
  const product = await productsRepository.listProductByTitle(title);

  if (!product) throw notFoundError();

  return product;
}

async function updateProduct(id: number, updatedFields: object) {
  const productUpdated = await productsRepository.updateProduct(id, updatedFields);

  if (!productUpdated) throw notFoundError();

  return productUpdated;
}

async function deleteProduct(id: number) {
  const product = await productsRepository.deleteProduct(id);

  if (!product) throw notFoundError();

  return product;
}

const productsService = {
  createProduct,
  listProductsByCategory,
  listProductByTitle,
  updateProduct,
  deleteProduct,
  getCategories,
  getTags,
};

export * from './errors';
export default productsService;
