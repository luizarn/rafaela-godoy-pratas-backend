import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  let category = await prisma.category.findFirst();
  if (!category) {
    await prisma.category.createMany({
      data: [
        {
          title: 'aneis',
        },
        {
        title: 'pulseiras',
        },
      ],
    });
  }

  let tag = await prisma.tag.findFirst();
  if (!tag) {
    await prisma.tag.createMany({
      data: [
        {
         title: 'zircônia',
        },
        {
            title: 'coração',
           },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });