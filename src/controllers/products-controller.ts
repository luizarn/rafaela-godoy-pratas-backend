import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import productsService from '@/services/products-service';
import { CustomRequest } from '@/middlewares/upload-image-middleware';
import { AuthenticatedRequest } from '@/middlewares';

export async function getCategories(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const categories = await productsService.getCategories();
    return res.status(httpStatus.OK).send(categories);
  } catch (e) {
    next(e);
  }
}

export async function getTags(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const tags = await productsService.getTags();
    return res.status(httpStatus.OK).send(tags);
  } catch (e) {
    next(e);
  }
}

export async function getProducts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const products = await productsService.getProducts();
    return res.status(httpStatus.OK).send(products);
  } catch (e) {
    next(e);
  }
}

export async function createProduct(req: CustomRequest, res: Response) {
  try {
    const { userId } = req;
    console.log(userId);
    const { title, description, price, categoryId, tagId, quantity, emphasis, launch } = req.body;
    const { publicUrl } = req;
    console.log(`a imagem é ${publicUrl}`);

    const product = await productsService.createProduct({
      title,
      description,
      quantity: Number(quantity),
      price: new Prisma.Decimal(price),
      categoryId: Number(categoryId),
      tagId: Number(tagId),
      publicUrl,
      emphasis: emphasis === 'true',
      launch: launch === 'true',
    });
    return res.status(httpStatus.CREATED).json({
      id: product.id,
      title: product.title,
    });
  } catch (error) {
    if (error.name === 'DuplicatedTitleError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(console.log(error));
  }
}

export async function listProductsByCategory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { category } = req.params;
  if (!category) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const products = await productsService.listProductsByCategory(category);
    return res.status(httpStatus.OK).send(products);
  } catch (error) {
    next(error);
  }
}

export async function listProductByTitle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { title } = req.params;
  if (!title) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const product = await productsService.listProductByTitle(title);
    return res.status(httpStatus.OK).send(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { updatedFields } = req.body;
  console.log(updatedFields);
  if (!updatedFields) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const product = await productsService.updateProduct(Number(id), updatedFields);
    return res.status(httpStatus.OK).send(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const product = await productsService.deleteProduct(Number(id));
    return res.status(httpStatus.OK).send(product);
  } catch (error) {
    next(error);
  }
}

export async function listProductsByEmphasis(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  try {
    const products = await productsService.listProductsByEmphasis();
    return res.status(httpStatus.OK).send(products);
  } catch (e) {
    next(e);
  }
}

export async function listProductsByLaunch(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  try {
    const products = await productsService.listProductsByLaunch();
    return res.status(httpStatus.OK).send(products);
  } catch (e) {
    next(e);
  }
}

export async function updateProductByCart(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  const { id } = req.params;
  const { quantityChange } = req.body;
  try {
    const product = await productsService.updateProductByCart(Number(id), Number(quantityChange));
    return res.status(httpStatus.OK).send(product);
  } catch (e) {
    next(e);
  }
}
