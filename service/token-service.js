import jwt from 'jsonwebtoken';

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config.js';
import Token from '../models/Token.cjs';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    async saveToken(userId, refreshToken) {
      const tokenDate = await Token.findOne({user: userId});
      if (tokenDate) {
        tokenDate.refreshToken = refreshToken;
        return tokenDate.save();
      }
      const token = await Token.create({user: userId, refreshToken});
      return token;
    }
}

export default new TokenService();
