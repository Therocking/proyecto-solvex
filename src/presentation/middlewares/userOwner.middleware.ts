import { NextFunction, Request, Response } from "express";
import { DicErrors } from "../../errors/diccionaryErrors";
import { PostgreProjectRepository } from "../../infracstructure/repositories";


export class ValidIfUserIsOwner {

   public static IsUserOwnerAccount(id: string) {
      return (req: Request, res: Response, next: NextFunction) => {
	 const user = req.body.user
	 if(id !== user.id) return res.status(401).json({msg: DicErrors.USER_NOT_OWNER})

	 next()
      }
   }

   public static IsUserOwnerProject(id: string) {
      return async (req: Request, res: Response, next: NextFunction) => {
	 const user = req.body.user

	 const repository = new PostgreProjectRepository()
	 const project = await repository.GetProjectById(id)

	 if(user.id !== project?.user_id) return res.status(401).json({msg: DicErrors.USER_NOT_OWNER})

	 next()
      }
   }
}
