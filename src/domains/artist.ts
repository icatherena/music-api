import express, { Router } from 'express'
import { HttpStatus } from 'http-status'

import { PrismaClient } from '@prisma/client'
// import { HttpError } from '../utils/errors';
const prisma = new PrismaClient()

export const artistRouter = Router();

// Retrieve all available artists
artistRouter.get(`/`, async (req, res, next) => {
  try {  
    const artists = await prisma.artist.findMany({
      orderBy: {
        id: 'asc'
      }
    })
    res.json(artists)
    if (!artists) {
      // Handle 404 (Not Found) error
      res.status(404).json({ error: 'Artist not found' });
    } else {
      next();
    }
  } catch {
    // Handle 500 (Internal Server Error) error
    res.status(500).json({ error: 'Internal Server Error. Failed to retrieve all available artists' });
  } 
});

// Retrieve a specific artist by its ID. Includes all its released music sorted by date
artistRouter.get(`/:artist_id`, async (req, res, next) => {
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
        },
        select: {
          id: true,
          type: true,
          name: true,
          post_date: true,
        }
      }
    },
  })
  if (!artist) {
    // Handle 404 (Not Found) error
    res.status(404).json({ error: 'Artist not found' });
  } else {
    next();
  }
} catch {
  // Handle 500 (Internal Server Error) error
  res.status(500).json({ error: 'Internal Server Error' });
}}, async (req, res) => {
  const artist_id = Number(req.params.artist_id); 
  const artist = await prisma.artist.findUnique({
    where: { 
      id: artist_id 
    },
    include: { 
      post: {
        orderBy: {
          post_date: 'desc',
        },
        select: {
          id: true,
          type: true,
          name: true,
          post_date: true,
        }
      }
    },
  });
  res.json(artist)
});

// The first async function is responsible for checking 
// if the artist_id exists in the database. It performs a 
// database query using prisma.artist.findUnique() to 
// find the artist with the given artist_id.

// The second async function is responsible for 
// handling the response and sending the artist data 
// as a JSON response

// ------------------------------------------------------

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
  const { name } = req.body
  if ( !name ) {
    return res.status(400).json({ error: 'Name is required' })
  }
  try {
    const result = await prisma.artist.create({
        data: {
          name,
        },
      })
      res.json(result)
  } catch (error){
    return res.status(500).json({ error: 'Internal Server Error. Failed to create the artist' })
  }
  
})

// Update an existing artist
artistRouter.put('/:artist_id', async (req, res) => {
  try {  
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
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error. Failed to update the artist' })
  }
})
  
// Delete an existing artist
artistRouter.delete(`/:artist_id`, async (req, res) => {
  try {
    const artist_id = Number(req.params.artist_id)
    const artist = await prisma.artist.delete({
      where: {
        id: artist_id
      },
    })
    res.json(artist)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error. Failed to delete the artist' })
  }
})