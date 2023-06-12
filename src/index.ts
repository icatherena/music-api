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

// Update an existing artist
app.put('/artist/:artist_id', async (req, res) => {
  const artist_id = Number(req.params.artist_id)
  const artist = await prisma.artist.update({
    where: { 
      id: artist_id
    },
    data: {
      ...req.body
    }
  })
  res.json(artist)
})

// Delete an existing artist
app.delete(`/artist/:artist_id`, async (req, res) => {
  const artist_id = Number(req.params.artist_id)
  const artist = await prisma.artist.delete({
    where: {
      id: artist_id
    },
  })
  res.json(artist)
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
      theme: {
        orderBy: {
          index: 'asc'
        }
      }
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

// Update a release
app.put(`/post/:post_id`, async (req, res) => {
  const post_id = Number(req.params.post_id)
  const post = await prisma.post.update({
    where: {
      id: post_id
    },
    data: {
      ...req.body
    }
  })
  res.json(post)
})

// Delete post by ID 
app.delete(`/post/:post_id`, async (req, res) => {
  const post_id = Number(req.params.post_id)
  const post = await prisma.post.delete({
    where: {
      id: post_id
    },
  })
  res.json(post)
})

// Retrieve a theme' song by its ID
app.get(`/theme/:theme_id`, async (req, res) => {
  const theme_id = Number(req.params.theme_id)
  const theme = await prisma.theme.findUnique({
    where: {
      id: theme_id
    },
  })
  res.json(theme)
})

// Create a theme' song
app.post(`/theme`, async (req, res) => {
  const result = await prisma.theme.create({ 
    data: { ...req.body },
  })
  res.json(result)
})

// Update a theme' song by its ID
app.put(`/theme/:theme_id`, async (req, res) => {
  const theme_id = Number(req.params.theme_id)
  const theme = await prisma.theme.update({
    where: {
      id: theme_id
    },
    data: {
      ...req.body
    }
  })
  res.json(theme)
})

// Delete a theme by its id
app.delete(`/theme/:theme_id`, async (req, res) => {
  const theme_id = Number(req.params.theme_id)
  const theme = await prisma.theme.delete({
    where: {
      id: theme_id
    },
  })
  res.json(theme)
})

app.listen(port, () =>
  console.log(`REST API server ready on port ${port}`),
)