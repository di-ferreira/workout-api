import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../../../adapters/User.Repository';
import { iUserRepository } from '../../../core/Repositories/iUser.repository';
import { NotFoundError, UnauthorizedError } from '../../helpers/ApiErrors';

async function VerifyAuth(req: Request, res: Response, next: NextFunction) {
  const repository: iUserRepository = new UserRepository();
  const { authorization } = req.headers;
  const { role } = req.body;
  const method = req.method;

  console.log('method: ' + method);

  if (!authorization) throw new UnauthorizedError('User Unauthorized!');

  const [_, accessToken] = authorization.split(' ');

  const payload = verify(accessToken, process.env.JWT_SECRET!);

  const id = payload.sub;

  if (!id) throw new UnauthorizedError('Invalid token!');

  const user = await repository.findById(Number(id));

  if (!user) throw new NotFoundError('User not found!');

  if (user.role === 'user')
    throw new UnauthorizedError('User does not have privileges!');

  if (method === 'PUT' && role === 'admin' && user.role === 'editor')
    throw new UnauthorizedError('User does not have privileges!');

  if (method === 'DELETE' && user.role === 'editor')
    throw new UnauthorizedError('User does not have privileges!');

  next();
}

export default VerifyAuth;
