import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getUserByLogin, addUser } from './data/DAO'; 
import { Role } from './models/Role';

const app = express();

app.use(bodyParser.json());
app.use(cors());
const JWT_SECRET = 'ZZZ';
const JWT_EXPIRATION = '15m';
const REFRESH_TOKEN_SECRET = 'CCC';
const REFRESH_TOKEN_EXPIRATION = '7d';

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByLogin(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.login, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  const refreshToken = jwt.sign({ id: user.id, username: user.login }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });

  res.json({ token, refreshToken, user: { id: user.id, username: user.login, role: user.role } });
});

app.post('/api/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { id: number, username: string };

    const newToken = jwt.sign({ id: payload.id, username: payload.username }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
