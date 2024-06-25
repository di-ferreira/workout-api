import { Request, Response } from 'express';

export type strArr = string[];

export type SearchParams = {
  page?: number;
  limit?: number;
};

export interface iList<T> {
  per_page: number;
  total_registers: number;
  current_page: number;
  data: T[];
}

export interface iController {
  list(req: Request, res: Response): Promise<Response>;

  show(req: Request, res: Response): Promise<Response>;

  create(req: Request, res: Response): Promise<Response>;

  save(req: Request, res: Response): Promise<Response>;

  remove(req: Request, res: Response): Promise<Response>;
}
