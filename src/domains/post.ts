import express, { Router } from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const postRouter = Router();

// Retrieve all released music from any artist
postRouter.get(`/`, async (req, res, next) => {
  try {  
    const posts = await prisma.post.findMany({
      orderBy: {
        artist_id: 'asc'
      },
      include: {
        theme: {
          select: {
            id: true,
            index: true,
            length: true,
          }
        }
      }
    })
    if (!posts) {
      // Handle 404 (Not Found) error
      res.status(404).json({ error: 'Post not found' });
    } else {
      next();
    }
    res.json(posts)
  } catch (error) {
    // Handle 500 (Internal Server Error) error
    res.status(500).json({ error: 'Internal Server Error. Failed to retrieve all released posts' });
  }
})
  
// Retrieve any released music by its ID. Includes number of songs, total length of the album in seconds plus all songs
postRouter.get(`/:post_id`, async (req, res, next) => {
  try {
    const post_id = Number(req.params.post_id)
    const post = await prisma.post.findUnique({
      where: { 
        id: post_id 
      },
      include: { 
        theme: {
          orderBy: {
            index: 'asc'
          },
          select: {
            id: true,
            index: true,
            length: true,
          }
        }
      },
    })
    const total_length = await prisma.theme.aggregate({
      _sum: {
        length: true,
      },
      where: {
        /* id: post_id */
        post_id: Number(req.params.post_id)
      }
    })
    const total_count = await prisma.theme.aggregate({
      _max: {
        index: true,
      },
      where: {
        /* id: post_id */
        post_id: Number(req.params.post_id)
      }
    }) 
    if (!post) {
      // Handle 404 (Not Found) error
      res.status(404).json({ error: 'Post not found' });
    } else {
      next();
    }
    res.json({post, total_length, total_count})
  } catch (error) {
    // Handle 500 (Internal Server Error) error
    res.status(500).json({ error: 'Internal Server Error. Failed to retrieve the post' });
  } 
})
  
// Create a new release, including all its theme' songs
postRouter.post(`/`, async (req, res) => {
  const { artist_id, type, name, post_date, theme } = req.body
  if ( !artist_id && !type && !name ) {
    return res.status(400).json({ error: 'artist_id, type and name are required' })
  }
  try {  
    const post = await prisma.post.create({
      data: {
        artist_id,
        type,
        name,
        post_date,
        theme: {
          create: theme,
        }
      }
    })
    res.json(post)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error. Failed to create the post' })
  }
})
  
// Update a release
postRouter.put(`/:post_id`, async (req, res) => {
  try {  
    const post_id = Number(req.params.post_id)
    const result = await prisma.post.update({
      where: { 
        id: post_id
      },
      data: { 
        ...req.body 
      },
    })
    res.json(result)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error. Failed to update the post' })
  }
})

// Delete post by ID 
postRouter.delete(`/:post_id`, async (req, res) => {
  try {  
    const post_id = Number(req.params.post_id)
    const post = await prisma.post.delete({
      where: {
        id: post_id
      },
    })
    res.json(post)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error. Failed to delete the artist' })
  }
})
  