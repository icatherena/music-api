import express, { Router } from 'express'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const themeRouter = Router();

// Retrieve a theme' song by its ID
themeRouter.get(`/:theme_id`, async (req, res) => {
    const theme_id = Number(req.params.theme_id)
    const theme = await prisma.theme.findUnique({
      where: {
        id: theme_id
      },
    })
    res.json(theme)
})
  
// Create a theme' song
themeRouter.post(`/`, async (req, res) => {
    const result = await prisma.theme.create({ 
      data: { ...req.body },
    })
    res.json(result)
})
  
// Update a theme' song by its ID
themeRouter.put(`/:theme_id`, async (req, res) => {
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
themeRouter.delete(`/:theme_id`, async (req, res) => {
    const theme_id = Number(req.params.theme_id)
    const theme = await prisma.theme.delete({
      where: {
        id: theme_id
      },
    })
    res.json(theme)
})
  