import jwt from 'jsonwebtoken';
import { secret } from '../config.js';

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  try {
    const token = req.header.authorization.split(' ')[1];
    if (!token) res.status(403).json({ message: 'user not authenticated' });
    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'user not authenticated' });
  }
};

export default authMiddleware;
