import { CartItem, Prisma } from '@prisma/client';
import { prisma } from '@/config';

// async function getCategories() {
//   return prisma.category.findMany();
// }

// async function getTags() {
//   return prisma.tag.findMany();
// }

// async function getProducts() {
//   return prisma.product.findMany({
//     include: {
//       Category: true,
//       Tag: true,
//     },
//   });
// }

// async function findByTitle(title: string) {
//   return prisma.product.findUnique({
//     where: {
//       title,
//     },
//   });
// }

export type CartItemParams = Omit<CartItem, 'createdAt' | 'updatedAt' | 'id'>;

async function create(userId: number) {
  return await prisma.cart.create({
    data: {
      userId,
    },
  });
}

async function findByUserId(userId: number) {
  return prisma.cart.findFirst({
    where: {
      userId,
    },
  });
}

async function createCartItem(cartId: number, productId: number, quantity: number) {
  console.log('ta chegando no repository');
  return await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
  });
}

async function listCartItems(cartId: number) {
  return await prisma.cartItem.findMany({
    where: {
      cartId,
    },
    include: {
      product: true,
    },
  });
}

// async function deleteCartItem(cartId: number, productId: number, quantity: number) {
//   return await prisma.cartItem.delete({
//       where: {
//         id,
//       },
//     });
//   }

//   return prisma.product.findMany({
//     where: {
//       categoryId: result.id,
//     },
//   });
// }

// async function listProductByTitle(title: string) {
//   return prisma.product.findFirst({
//     where: {
//       title,
//     },
//   });
// }

// async function updateProduct(id: number, updatedFields: object) {
//   return prisma.product.update({
//     where: {
//       id,
//     },
//     data: updatedFields,
//   });
// }
// async function deleteProduct(id: number) {
//   return prisma.product.delete({
//     where: {
//       id,
//     },
//   });
// }

// async function listProductsByEmphasis() {
//   return prisma.product.findMany({
//     where: {
//       emphasis: true,
//     },
//   });
// }

// async function listProductsByLaunch() {
//   return prisma.product.findMany({
//     where: {
//       launch: true,
//     },
//   });
// }

const cartRepository = {
  create,
  findByUserId,
  createCartItem,
  listCartItems,
};

export default cartRepository;
