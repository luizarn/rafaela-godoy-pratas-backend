import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AuthenticatedRequest } from './authentication-middleware';

export interface CustomRequest extends AuthenticatedRequest {
  publicUrl?: string;
}

const s3 = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: `${process.env.ACCESSKEYID}`,
    secretAccessKey: `${process.env.SECRETACCESSKEY}`,
  },
});

export const handleUpload = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      const publicUrl = 'https://aquitemplacas.com.br/img/produtos/g/36-atencao-area-de-teste.jpg';
      req.publicUrl = publicUrl;
      next();
    } else {
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
      req.publicUrl = publicUrl;
      next();
    }
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return generateBadRequestResponse(res);
  }
};

function generateBadRequestResponse(res: Response) {
  res.status(httpStatus.BAD_REQUEST).send('Erro ao fazer upload da imagem.');
}
