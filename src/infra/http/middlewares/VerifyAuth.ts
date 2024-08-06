import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../../../adapters/User.Repository';
import { iUserRepository } from '../../../core/Repositories/iUser.repository';
import { UnauthorizedError } from '../../helpers/ApiErrors';

async function VerifyAuth(req: Request, res: Response, next: NextFunction) {
  const repository: iUserRepository = new UserRepository();
  const { authorization } = req.headers;

  if (!authorization) throw new UnauthorizedError('User Unauthorized!');

  const [_, accessToken] = authorization.split(' ');

  const payload = verify(accessToken, process.env.JWT_SECRET!);

  const id = payload.sub;

  if (!id) throw new UnauthorizedError('Invalid token!');

  const user = await repository.findById(Number(id));

  if (!user) throw new UnauthorizedError('User not found!');

  next();
}

export default VerifyAuth;
