import { NextFunction, Request, Response } from "express";
import { PostgreParticipantRepository } from "../../infracstructure/repositories";
import { DicErrors } from "../../errors/diccionaryErrors";


export class ExistIn {

   public static ExistUserInTheProject = async(req: Request, res: Response, next: NextFunction) => {
      const {user_id} = req.params

      const repository = new PostgreParticipantRepository()
      const participant = await repository.GetParticipantById(user_id)
      
      if(participant) return res.status(400).json({msg: DicErrors.USER_ALREADY_IN_PROJECT})

      next()
   }

   public static ExistUserInProjectToRemoveIt = async(req: Request, res: Response, next: NextFunction)=> {
      const {user_id} = req.params

      const repository = new PostgreParticipantRepository()
      const participant = await repository.GetParticipantById(user_id)

      if(!participant) return res.status(404).json({msg: DicErrors.USER_NOT_FOUND})

      next()
   }
}
