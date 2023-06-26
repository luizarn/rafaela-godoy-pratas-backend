import { Router } from 'express';
import { createProductSchema } from '@/schemas';
import { validateBody, handleUpload, authenticateToken, authenticateOwner, uploadImage } from '@/middlewares';
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
  .get('/category/:title', listProductByTitle)
  .all('/*', authenticateToken)
  .put('/updateByCart/:id', updateProductByCart)
  .all('/*', authenticateOwner)
  .get('/admin/list', getProducts)
  .post('/admin/post', uploadImage, handleUpload, validateBody(createProductSchema), createProduct)
  .put('/admin/:id', updateProduct)
  .delete('/admin/:id', deleteProduct);
export { productsRouter };
