import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import { AuthenticatedRequest } from './authentication-middleware';

export interface CustomRequest extends AuthenticatedRequest {
  publicUrl?: string;
}

const s3 = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: 'AKIAXYRNNAHI23HTK6EI',
    secretAccessKey: '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',
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
});

export const uploadImage = upload.single('photo');

export const handleUpload = async (req: CustomRequest, res: Response, next: NextFunction) => {
  console.log('teste 1');
  try {
    const file = req.file;
    if (!file) {
      return generateBadRequestResponse(res);
    }

    const uploadParams = {
      Bucket: 'rafaelagpratas',
      Key: `${Date.now().toString()}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    const publicUrl = `https://rafaelagpratas.s3.amazonaws.com/${uploadParams.Key}`;
    console.log(`upload middleware ${publicUrl}`);
    req.publicUrl = publicUrl;
    console.log(`2 upload middleware ${publicUrl}`);
    next();
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return generateBadRequestResponse(res);
  }
};

function generateBadRequestResponse(res: Response) {
  res.status(httpStatus.BAD_REQUEST).send('Erro ao fazer upload da imagem.');
}
