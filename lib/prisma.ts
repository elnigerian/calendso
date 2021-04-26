// @ts-ignore
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//   global.prisma = new PrismaClient();
//   }
//   // @ts-ignore
//   // prisma = !global.prisma ? global.prisma : new PrismaClient();
// }

export default prisma;
