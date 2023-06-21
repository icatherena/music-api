import express, { Router } from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const postRouter = Router();

// Retrieve all released music from any artist
postRouter.get(`/`, async (req, res) => {
    const posts = await prisma.post.findMany({
      include: {
        theme: {}
      }
    })
    res.json(posts)
})
  
// Retrieve any released music by its ID. Includes number of songs, total length of the album in seconds plus all songs
postRouter.get(`/:post_id`, async (req, res) => {
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
postRouter.post(`/`, async (req, res) => {
    const result = await prisma.post.create({
      data: { ...req.body },
    })
    res.json(result)
})
  
// Update a release
postRouter.put(`/:post_id`, async (req, res) => {
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
postRouter.delete(`/:post_id`, async (req, res) => {
    const post_id = Number(req.params.post_id)
    const post = await prisma.post.delete({
      where: {
        id: post_id
      },
    })
    res.json(post)
})
  