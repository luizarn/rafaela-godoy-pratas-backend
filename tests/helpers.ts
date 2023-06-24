// import * as jwt from 'jsonwebtoken';
// import { User } from '@prisma/client';

// import { createUserIsNotOwner } from './factories';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.user.deleteMany({});
}

// export async function generateValidToken(user?: User) {
//   const incomingUser = user || (await createUserIsNotOwner());
//   const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

//   await createSession(token);

//   return token;
// }
