import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';
import { cannotEnrollBeforeStartDateError } from '@/errors';
import { CreateUserParams } from '@/schemas';

export async function createUser({ email, password, cpf, name, surname, isOwner, phone }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
    cpf,
    name,
    surname,
    isOwner,
    phone,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const userService = {
  createUser,
};

export * from './errors';
export default userService;
