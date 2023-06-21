import express, { Router } from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const artistRouter = Router();

// Retrieve all available artists
artistRouter.get(`/`, async (req, res) => {
    const artists = await prisma.artist.findMany()
    res.json(artists)
});

// Retrieve a specific artist by its ID. Includes all its released music sorted by date
artistRouter.get(`/:artist_id`, async (req, res) => {
    try {
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
      if (!artist) {
        // Handle 404 (Not Found) error
        res.status(404).json({ error: 'Artist not found' });
      } else {
        res.json(artist);
      }
    } catch (error) {
        // Handle 500 (Internal Server Error) error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
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

artistRouter.post(`/`, async (req, res) => {
    const result = await prisma.artist.create({
      data: { ...req.body },
    })
    res.json(result)
})

// Update an existing artist
artistRouter.put('/:artist_id', async (req, res) => {
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
artistRouter.delete(`/:artist_id`, async (req, res) => {
    const artist_id = Number(req.params.artist_id)
    const artist = await prisma.artist.delete({
      where: {
        id: artist_id
      },
    })
    res.json(artist)
})