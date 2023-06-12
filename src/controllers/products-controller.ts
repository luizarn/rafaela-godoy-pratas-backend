import { Response } from 'express';
import httpStatus from 'http-status';
import productsService from '@/services/products-service';
import { CustomRequest } from '@/middlewares/upload-image-middleware';

export async function createProduct(req: CustomRequest, res: Response) {
  try {
    const { userId } = req;
    console.log(userId);
    const { title, description, price, categoryId, tagId, size } = req.body;
    const { publicUrl } = req;
    console.log(`a imagem é ${publicUrl}`);

    const product = await productsService.createProduct({
      title,
      description,
      price: Number(price),
      categoryId: Number(categoryId),
      tagId: Number(tagId),
      size: Number(size),
      publicUrl,
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

// //Listar todos os produtos
// export async function listProducts(req, res) {

//     try {

//         const list = await db.collection('products').find().toArray()

//         res.send(list)

//     } catch (error) {
//         res.status(500).send(error.message)
//     }

// }
// //Listar os mais vendidos / Por enquanto só retorna aleatóriamente
// export async function betterSellers(req, res) {

//     try {

//         const bs = await db.collection('products').find().limit(10).toArray()
//         let aux = []
//         while (aux.length < bs.length) {
//             let n = Math.floor(Math.random() * bs.length)
//             if (!aux.includes(bs[n])) {
//                 aux.push(bs[n])
//             }
//         }

//         res.send(aux)

//     } catch (error) {
//         res.status(500).send(error.message)
//     }

// }
// //Cadastrar Produto
// export async function registerProduct(req, res) {
//     const { name, description, price, quantity, imgURL } = req.body
//     try {
//         await db.collection('products').insertOne({ name, description, price, quantity, imgURL })
//         res.sendStatus(201)
//     } catch (error
//         ) {
//         res.status(500).send(error.message)
//     }
// }

// //Deletar produto
// export async function deleteProduct(req, res) {
//     const { id } = req.params;

//     try {
//         await db.collection('products').deleteOne({ _id: ObjectId(id) })
//         res.status(202).send("Ok")
//     } catch (error
//         ) {
//         res.status(500).send(error.message)
//     }
// }
