import express, { Router } from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const themeRouter = Router();

// Retrieve a theme' song by its ID
themeRouter.get(`/:theme_id`, async (req, res, next) => {
  try {  
    const theme_id = Number(req.params.theme_id)
    const theme = await prisma.theme.findUnique({
      where: {
        id: theme_id
      },
    })
    if (!theme) {
      // Handle 404 (Not Found) error
      res.status(404).json({ error: 'Theme not found' });
    } else {
      next();
    }
    res.json(theme)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error. Failed to retrieve the theme' });
  }
})
  
// Create a theme' song
themeRouter.post(`/`, async (req, res) => {
  const { post_id, index, length } = req.body
  if ( !post_id && !index && !length ) {
    return res.status(400).json({ error: 'post_id, index and length are required' })
  }
  try {  
    const result = await prisma.theme.create({ 
      data: { 
        post_id,
        index,
        length,
       },
    })
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error. Failed to create the theme' });
  }
})
  
// Update a theme' song by its ID
themeRouter.put(`/:theme_id`, async (req, res) => {
  try {  
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
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error. Failed to update the theme' })
  }
})
  
// Delete a theme by its id
themeRouter.delete(`/:theme_id`, async (req, res) => {
  try {  
    const theme_id = Number(req.params.theme_id)
    const theme = await prisma.theme.delete({
      where: {
        id: theme_id
      },
    })
    res.json(theme)
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error. Failed to delete the theme' })
  }
})
  