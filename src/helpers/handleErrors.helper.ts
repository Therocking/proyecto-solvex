import { Response } from "express"
import { CustomHttpErrors } from "./customHttpErrors.helper"

export class CustomHandleError {                                                                               
   public static HandleError(error: unknown, res: Response) {
   
      if(error instanceof CustomHttpErrors) return res.status(error.statusCode).json({ error: error.msg })

      console.log(error)
      return res.status(500).json({error})
   }
}
