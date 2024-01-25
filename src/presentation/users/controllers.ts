import { Request, Response } from "express";
import { UsersService } from "../services/users.services";
import { CustomHandleError } from "../../helpers";


export class UsersController {
   constructor(
      private readonly service: UsersService
   ) {}

   public GetOne = (req: Request, res: Response) => {
      const userId = req.params.user_id

      this.service.GetOne(userId)
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public GetAll = (req: Request, res: Response) => {
      const {skip=0, limit=5, name} = req.query

      const skipToNumber = Number(skip)
      const nameToString = String(name)
      const limitToNumber = Number(limit)

      this.service.GetAll({skip: skipToNumber, limit: limitToNumber, name: nameToString})
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
