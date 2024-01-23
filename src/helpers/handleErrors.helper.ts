import { Response } from "express"
import { CustomHttpErrors } from "./customHttpErrors.helper"

export class CustomHandleError {                                                                               
   public static HandleError(error: any, res: Response) {
   
      if(error instanceof CustomHttpErrors) return res.status(error.statusCode).json({ msg: error.msg })

      console.log(error)
      return res.status(500).json({msg: error.msg})
   }
}
