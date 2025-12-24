import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@/generated/prisma/client";
import config from "../prisma.config";

const adapter = new PrismaPg({ 
  connectionString: config.datasource?.url
});

const prisma = new PrismaClient({ adapter });

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "OPEN" as const
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "IN_PROGRESS" as const
  }
];

const seed = async () => {
  // for (const ticket of tickets) {
  //   await prisma.ticket.create({
  //     data: ticket
  //   })
  // }

  // const promises = tickets.map((ticket) => 
  //   prisma.ticket.create({
  //     data: ticket
  //   })
  // );
  // await Promise.all(promises);

  // Delete all tickets first (because when we seed, we do it in the empty db)
  const t0 = performance.now();
  console.log('DB Seed: Started ...');
  
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`)
}

seed();