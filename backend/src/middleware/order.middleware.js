import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../DB/models/User.model.js';
import { verifyToken } from '../utilities/security/token.security.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    const decoded =verifyToken({token:token,signature: process.env.TOKEN_SIGNATURE})
    //  jwt.verify(token, process.env.TOKEN_SIGNATURE);
    req.user = await User.findById(decoded.id).select('-password');
  }
  if (!token || !req.user) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };