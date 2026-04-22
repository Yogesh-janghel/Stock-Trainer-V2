import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as jwtPkg from 'jsonwebtoken';
import { prisma } from '../index';
import { z } from 'zod';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key';

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash,
        portfolios: {
          create: {} // Create an empty portfolio for the user
        }
      }
    });

    const token = jwtPkg.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        virtualCash: user.virtualCash
      }
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data', details: error });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwtPkg.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        virtualCash: user.virtualCash
      }
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

export default router;
