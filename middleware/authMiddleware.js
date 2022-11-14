import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../config.js';

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) res.status(403).json({ message: 'user not authenticated' });
    req.user = jwt.verify(token, JWT_ACCESS_SECRET);
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'user not authenticated' });
  }
};

export default authMiddleware;
