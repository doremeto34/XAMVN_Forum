import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (username: string, email: string, hashedPassword: string) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
