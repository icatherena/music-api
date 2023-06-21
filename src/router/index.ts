import { Router } from 'express'

import { artistRouter } from '../domains/artist'
import { postRouter } from '../domains/post';
import { themeRouter } from '../domains/theme';

export const router = Router();

// Use the artistRouter file to handle
// endpoints starting with /artist
router.use('/artist', artistRouter);

// Use the postRouter file to handle
// endpoints starting with /post
router.use('/post', postRouter);

// Use the themeRouter file to handle
// endpoints starting with /theme
router.use('/theme', themeRouter);