import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, handleUpload, uploadImage, authenticateToken, authenticateOwner } from '@/middlewares';
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  getTags,
  listProductByTitle,
  listProductsByCategory,
  listProductsByEmphasis,
  listProductsByLaunch,
  updateProduct,
  updateProductByCart,
} from '@/controllers';

const productsRouter = Router();

productsRouter
  .get('/categories', getCategories)
  .get('/emphasis', listProductsByEmphasis)
  .get('/launch', listProductsByLaunch)
  .get('/tags', getTags)
  .get('/:category', listProductsByCategory)
  .get('/produtos/:title', listProductByTitle)
  .all('/*', authenticateToken)
  .put('/produtos/:id', updateProductByCart)
  .all('/*', authenticateOwner)
  .get('/admin/products', getProducts)
  .post('/admin/products', uploadImage, handleUpload, validateBody(createProductSchema), createProduct)
  .put('/admin/produtos/:id', updateProduct)
  .delete('/admin/produtos/:id', deleteProduct);
export { productsRouter };
