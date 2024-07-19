import { Request, Response } from 'express';
import { STATUS_CODE } from '../../../../@types/index';
import { iController } from '../../../../@types/workout';
import { UserRepository } from '../../../../adapters/User.Repository';
import { iUser } from '../../../../core/Entities/iUser';
import { iUserRepository } from '../../../../core/Repositories/iUser.repository';
import CreateUserUseCase from '../../../../core/UseCases/User/CreateUserUseCase';
import FindUserByEmailUseCase from '../../../../core/UseCases/User/FindUserByEmailUseCase';
import FindUserByIdUseCase from '../../../../core/UseCases/User/FindUserByIdUseCase';
import FindUserByNameUseCase from '../../../../core/UseCases/User/FindUserByNameUseCase';
import ListUsersUseCase from '../../../../core/UseCases/User/ListUsersUseCase';
import RemoveUserUseCase from '../../../../core/UseCases/User/RemoveUserUseCase';
import UpdateUserUseCase from '../../../../core/UseCases/User/UpdateUserUseCase';
import { BadRequestError } from '../../../helpers/ApiErrors';
import { createUserValidation } from '../../../validations/User.validation';

export class UserController implements iController {
  private repository: iUserRepository;
  private createUseCase: CreateUserUseCase;
  private listUseCase: ListUsersUseCase;
  private findUseCase: FindUserByIdUseCase;
  private findByNameUseCase: FindUserByNameUseCase;
  private findByEmailUseCase: FindUserByEmailUseCase;
  private updateUseCase: UpdateUserUseCase;
  private removeUseCase: RemoveUserUseCase;

  constructor() {
    this.repository = new UserRepository();
    this.createUseCase = new CreateUserUseCase(this.repository);
    this.listUseCase = new ListUsersUseCase(this.repository);
    this.findUseCase = new FindUserByIdUseCase(this.repository);
    this.findByEmailUseCase = new FindUserByEmailUseCase(this.repository);
    this.findByNameUseCase = new FindUserByNameUseCase(this.repository);
    this.updateUseCase = new UpdateUserUseCase(this.repository);
    this.removeUseCase = new RemoveUserUseCase(this.repository);
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
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
      console.log('Invalid', validationObj.error.issues[0].message);

      throw new BadRequestError(validationObj.error.issues[0].message);
    }

    const existsUser: iUser | null = await this.repository.findByEmail(
      newUser.email
    );

    if (existsUser !== null) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        error: 'Exists a User with this email!',
        result: existsUser,
      });
    }

    const result = await this.createUseCase.execute(newUser);
    return res.status(STATUS_CODE.CREATED).json({ result });
  }

  list(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  show(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  save(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  remove(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}
