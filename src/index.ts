import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newArtist = await prisma.artist.create({
    data: {
      name: 'Santana',
      post: {
        create: {
          type: 'SINGLE',
          name: 'Smooth',
          post_date: new Date('1999-06-15T00:00:00Z'), 
          // newDate constructor is used to initialize a date object with the proper DateTime format
          // Must be used in order to provide a DateTime value instead of string one
          // 'T' is a separator indicating that the time follows 
          // 'Z' at the end denotes the time zone. In this case, it represents UTC (Coordinated Universal Time)
          // The letter 'Z' stands for "Zulu time," which is another term for UTC 
          // DO I HAVE TO CHANGE THE TIME ZONE?
        },
      },
    },
  })
  console.log('Created new artist: ', newArtist)

  const allArtists = await prisma.artist.findMany({
    include: { post: true },
  })
  console.log('All artists: ')
  console.dir(allArtists, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())