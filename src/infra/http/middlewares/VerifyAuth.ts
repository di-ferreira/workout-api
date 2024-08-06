import { STATUS_CODE } from '@/@types';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../../../adapters/User.Repository';
import { iUserRepository } from '../../../core/Repositories/iUser.repository';
async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const repository: iUserRepository = new UserRepository();
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ error: 'User Unauthorized!' });
    }

    const accessToken = authorization.split(' ')[0];
    const payload = verify(accessToken, process.env.JWT_SECRET!);

    const { id } = payload as any;

    if (!id) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ error: 'Invalid token!' });
    }
    const user = await repository.findById(id);
    if (!user) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ error: 'User not found!' });
    }
    // req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ error: 'User expired!' });
    }
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server error!' });
  }
}
