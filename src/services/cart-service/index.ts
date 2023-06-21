import { CartItem } from '@prisma/client';
// import { duplicatedTitleError, maximumLimitEmphasisError, maximumLimitLaunchError } from './errors';
// import productsRepository from '@/repositories/products-repository';
// import { notFoundError } from '@/errors';
import cartRepository from '@/repositories/cart-repository';

export type ProductParams = Omit<CartItem, 'createdAt' | 'updatedAt' | 'id'>;

// async function getCategories() {
//   const categories = await productsRepository.getCategories();

//   if (!categories) throw notFoundError();

//   return categories;
// }

// async function getTags() {
//   const tags = await productsRepository.getTags();

//   if (!tags) throw notFoundError();

//   return tags;
// }

// async function getProducts() {
//   const products = await productsRepository.getProducts();

//   if (!products) throw notFoundError();

//   return products;
// }

export async function createCartItem(userId: number, productId: number, quantity: number): Promise<CartItem> {
  const cart = await cartRepository.findByUserId(userId);

  return cartRepository.createCartItem(cart.id, productId, quantity);
}

// async function validateUniqueTitleOrFail(title: string) {
//   const productWithSameEmail = await productsRepository.findByTitle(title);
//   if (productWithSameEmail) {
//     throw duplicatedTitleError();
//   }
// }

// async function listProductsByCategory(category: string) {
//   const products = await productsRepository.listProductsByCategory(category);

//   if (!products) throw notFoundError();

//   return products;
// }

// async function listProductByTitle(title: string) {
//   const product = await productsRepository.listProductByTitle(title);

//   if (!product) throw notFoundError();

//   return product;
// }

// async function updateProduct(id: number, updatedFields: object) {
//   const productUpdated = await productsRepository.updateProduct(id, updatedFields);

//   if (!productUpdated) throw notFoundError();

//   return productUpdated;
// }

// async function deleteProduct(id: number) {
//   const product = await productsRepository.deleteProduct(id);

//   if (!product) throw notFoundError();

//   return product;
// }

// async function listProductsByEmphasis() {
//   const products = await productsRepository.listProductsByEmphasis();

//   if (!products) throw notFoundError();

//   return products;
// }

// async function listProductsByLaunch() {
//   const products = await productsRepository.listProductsByLaunch();

//   if (!products) throw notFoundError();

//   return products;
// }

// async function validateLimitEmphasis() {
//   const productsWithEmphasis = await listProductsByEmphasis();
//   const emphasisLimit = 12;

//   if (productsWithEmphasis.length >= emphasisLimit) {
//     throw maximumLimitEmphasisError();
//   }
// }
// async function validateLimitLaunch() {
//   const productsWithLaunch = await listProductsByLaunch();
//   const lauchLimit = 12;

//   if (productsWithLaunch.length >= lauchLimit) {
//     throw maximumLimitLaunchError();
//   }
// }

const cartService = {
  createCartItem,
};

export default cartService;
