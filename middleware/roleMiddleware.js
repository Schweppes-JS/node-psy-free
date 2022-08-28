import jwt from 'jsonwebtoken';
import { secret } from '../config.js';

const roleMiddleware = (roles) => (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'user not authenticated' });
    const { role: userRoles } = jwt.verify(token, secret);
    const hasRole = userRoles?.some((role) => roles.includes(role));
    if (!hasRole) return res.status(403).json({ message: 'you do not have permission' });
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'problem with authentication' });
  }
};

export default roleMiddleware;
