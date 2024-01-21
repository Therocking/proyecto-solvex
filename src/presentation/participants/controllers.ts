import { Request, Response } from "express";
import { ParticipantsService } from "../services/participants.services";
import { CustomHandleError } from "../../helpers";


export class ParticipantsController {
   constructor(
      private readonly service: ParticipantsService
   ) {}

   public GetAll = (_req: Request, res: Response) => {
      this.service.GetAll()
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Create = (req: Request, res: Response) => {
      this.service.Create({...req.body, ...req.params})
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Delete= (req: Request, res: Response) => {
      const userId = req.params.userId

      this.service.Delete(userId)
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }
}
