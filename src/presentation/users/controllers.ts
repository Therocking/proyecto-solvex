import { Request, Response } from "express";
import { UsersService } from "../services/users.services";
import { CustomHandleError } from "../../helpers/handleErrors.helper";


export class UsersController {
   constructor(
      private readonly service: UsersService
   ) {}

   public GetAll = (_req: Request, res: Response) => {
      this.service.GetAll()
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Create = (req: Request, res: Response) => {
      this.service.Create(req.body)
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Update = (req: Request, res: Response) => {
      const id = req.params.id

      this.service.Update({...req.body, id})
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Delete = (req: Request, res: Response) => {
      const id = req.params.id

      this.service.Delete(id)
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }
}
