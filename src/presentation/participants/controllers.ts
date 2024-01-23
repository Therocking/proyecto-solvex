import { Request, Response } from "express";
import { ParticipantsService } from "../services/participants.services";
import { CustomHandleError } from "../../helpers";


export class ParticipantsController {
   constructor(
      private readonly service: ParticipantsService
   ) {}

   public GetAll = (req: Request, res: Response) => {
      const {skip=0, limit=5} = req.query
      const projetId = req.params.project_id

      const skipToNum = Number(skip)
      const limitToNum = Number(limit)

      this.service.GetAll({skip: skipToNum, limit: limitToNum, project_id: projetId})
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Create = (req: Request, res: Response) => {
      this.service.Create({...req.body, ...req.params})
	 .then(resp => res.status(201).json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Delete= (req: Request, res: Response) => {
      const {user_id, project_id} = req.params

      this.service.Delete(user_id, project_id)
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }
}
