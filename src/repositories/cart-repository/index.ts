import { CartItem, Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { notFoundError } from '@/errors';

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

async function deleteCartItem(id: number, cartId: number) {
  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) {
    throw notFoundError();
  }

  const cartItemToDelete = cart.items.find((item) => item.id === id);

  if (!cartItemToDelete) {
    throw notFoundError();
  }

  return await prisma.cartItem.delete({
    where: {
      id,
    },
  });
}

const cartRepository = {
  create,
  findByUserId,
  createCartItem,
  listCartItems,
  deleteCartItem,
};

export default cartRepository;
