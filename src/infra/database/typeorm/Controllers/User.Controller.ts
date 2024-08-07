import { compare } from 'bcrypt';
import 'dotenv';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { STATUS_CODE } from '../../../../@types/index';
import { iController } from '../../../../@types/workout';
import { UserRepository } from '../../../../adapters/User.Repository';
import { iUser } from '../../../../core/Entities/iUser';
import { iUserRepository } from '../../../../core/Repositories/iUser.repository';
import CreateUserUseCase from '../../../../core/UseCases/User/CreateUserUseCase';
import FindUserByEmailUseCase from '../../../../core/UseCases/User/FindUserByEmailUseCase';
import FindUserByIdUseCase from '../../../../core/UseCases/User/FindUserByIdUseCase';
import ListUsersUseCase from '../../../../core/UseCases/User/ListUsersUseCase';
import RemoveUserUseCase from '../../../../core/UseCases/User/RemoveUserUseCase';
import UpdateUserUseCase from '../../../../core/UseCases/User/UpdateUserUseCase';
import { BadRequestError, NotFoundError } from '../../../helpers/ApiErrors';
import { generateHash } from '../../../helpers/passwordUtils';
import {
  createUserValidation,
  updateUserValidation,
} from '../../../validations/User.validation';

export class UserController implements iController {
  private repository: iUserRepository;
  private createUseCase: CreateUserUseCase;
  private listUseCase: ListUsersUseCase;
  private findUseCase: FindUserByIdUseCase;
  private findByEmailUseCase: FindUserByEmailUseCase;
  private updateUseCase: UpdateUserUseCase;
  private removeUseCase: RemoveUserUseCase;

  constructor() {
    this.repository = new UserRepository();
    this.createUseCase = new CreateUserUseCase(this.repository);
    this.listUseCase = new ListUsersUseCase(this.repository);
    this.findUseCase = new FindUserByIdUseCase(this.repository);
    this.findByEmailUseCase = new FindUserByEmailUseCase(this.repository);
    this.updateUseCase = new UpdateUserUseCase(this.repository);
    this.removeUseCase = new RemoveUserUseCase(this.repository);
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.login = this.login.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body;

    const newUser: iUser = {
      id: 0,
      name,
      email,
      password,
      role: role ? role : 'user',
    };

    const validationObj = createUserValidation.safeParse(newUser);

    if (!validationObj.success) {
      throw new BadRequestError(validationObj.error.issues[0].message);
    }

    const existsUser: iUser | null = await this.repository.findByEmail(
      newUser.email
    );

    if (existsUser !== null) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: 'Exists a User with this email!',
        result: {
          id: existsUser.id,
          name: existsUser.name,
          email: existsUser.email,
        },
      });
    }

    newUser.password = await generateHash(newUser.password);

    const result = await this.createUseCase.execute(newUser);
    return res.status(STATUS_CODE.CREATED).json({
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
    });
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;
    const listUsers = await this.listUseCase.execute({
      page: Number(page),
      limit: Number(limit),
    });

    if (listUsers.total_registers === 0) {
      return res.status(STATUS_CODE.NO_CONTENT).json(listUsers);
    }

    return res.status(STATUS_CODE.SUCCESS).json(listUsers);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    let user: iUser | iUser[] | null;
    const isNumber: boolean = !isNaN(Number(id));

    if (isNumber) {
      user = await this.findUseCase.execute(Number(id));
    } else {
      user = await this.findByEmailUseCase.execute(id);
    }

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return res.status(STATUS_CODE.SUCCESS).json(user);
  }

  async save(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body;
    const { id } = req.params;

    let user: iUser | iUser[] | null;
    const isNumber: boolean = !isNaN(Number(id));

    if (isNumber) {
      user = await this.findUseCase.execute(Number(id));
    } else {
      user = await this.findByEmailUseCase.execute(id);
    }

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const newUser: iUser = {
      id: user.id,
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: password ? password : user.password,
      role: role ? role : user.role,
    };

    const validationObj = updateUserValidation.safeParse(newUser);

    if (!validationObj.success)
      throw new BadRequestError(validationObj.error.issues[0].message);

    const existsUser: iUser | null = await this.repository.findByEmail(
      newUser.email
    );

    if (existsUser !== null && existsUser.id !== newUser.id) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: 'Exists a User with this email!',
        result: {
          id: existsUser.id,
          name: existsUser.name,
          email: existsUser.email,
        },
      });
    }

    newUser.password = await generateHash(newUser.password);

    const result = await this.updateUseCase.execute(newUser);
    return res.status(STATUS_CODE.SUCCESS).json({
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
    });
  }

  async remove(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const existsUser: iUser | null = await this.repository.findByEmail(email);

    if (existsUser === null)
      throw new BadRequestError('Email or password incorrect!');

    const passwordIsValid = await compare(password, existsUser.password);

    if (!passwordIsValid)
      throw new BadRequestError('Email or password incorrect!');

    const token = sign(
      { id: existsUser.id.toString() },
      process.env.JWT_SECRET!,
      {
        subject: existsUser.id.toString(),
        expiresIn: process.env.JWT_EXPIRE!,
      }
    );

    return res.status(STATUS_CODE.SUCCESS).json({ result: token });
  }
}
