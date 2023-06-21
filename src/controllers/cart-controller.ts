import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import cartService from '@/services/cart-service';

export async function createCartItem(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { productId, quantity } = req.body;

    const cart = await cartService.createCartItem(userId, productId, quantity);
    return res.status(httpStatus.CREATED).json({ id: cart.id });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(console.log(error));
  }
}
