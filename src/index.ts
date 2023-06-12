import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
const port = 3000;

app.use(express.json())

// Retrieve all available artists
app.get(`/artist`, async (req, res) => {
  const artists = await prisma.artist.findMany()
  res.json(artists)
})

// Retrieve a specific artist by its ID. Includes all its released music sorted by date
app.get(`/artist/:artist_id`, async (req, res) => {
  const artist_id = Number(req.params.artist_id)
  const artist = await prisma.artist.findUnique({
    where: { 
      id: artist_id 
    },
    include: { 
      post: {
        orderBy: {
          post_date: 'desc',
        }
      }
    },
  })
  res.json(artist)
})

// Create a new artist
/* app.post('/artist', async (req, res) => {
  const { name } = req.body.name
  const result = await prisma.artist.create({
    data: { 
      name,
    },
  })
  res.json(result)
}) */

app.post(`/artist`, async (req, res) => {
  const result = await prisma.artist.create({
    data: { ...req.body },
  })
  res.json(result)
})

// Retrieve all released music from any artist
app.get(`/post/`, async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      theme: {}
    }
  })
  res.json(posts)
})

// Retrieve any released music by its ID. Includes number of songs, total length of the album in seconds plus all songs
app.get(`/post/:post_id`, async (req, res) => {
  const post_id = Number(req.params.post_id)
  const post = await prisma.post.findUnique({
    where: { 
      id: post_id 
    },
    include: { 
      theme: {}
    },
  })
  res.json(post)
})

// Create a new release, including all its theme' songs
app.post(`/post`, async (req, res) => {
  const result = await prisma.post.create({
    data: { ...req.body },
  })
  res.json(result)
})

app.post(`/theme`, async (req, res) => {
  const result = await prisma.theme.create({ 
    data: { ...req.body },
  })
  res.json(result)
})

app.listen(port, () =>
  console.log(`REST API server ready on port ${port}`),
)