import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();

// Initialize Prisma
const prisma = new PrismaClient();

const httpServer = createServer(app);

// Socket.io initialization (Conditional for Vercel)
let io: any = null;
if (process.env.NODE_ENV !== 'production') {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  if (io) {
    io.on('connection', (socket: any) => {
      console.log('A user connected:', socket.id);
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  }
}

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth';
import stocksRoutes from './routes/stocks';
import ordersRoutes from './routes/orders';
import portfolioRoutes from './routes/portfolio';
import leaderboardRoutes from './routes/leaderboard';
import watchlistRoutes from './routes/watchlist';
import achievementsRoutes from './routes/achievements';
import newsRoutes from './routes/news';

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stocksRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/news', newsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Only listen if not on Vercel
if (process.env.NODE_ENV !== 'production') {
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
export { app, io, prisma };
