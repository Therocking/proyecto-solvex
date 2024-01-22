import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


export class ShowExpressValidatorErrors {
   
   public static validFields = (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
	 return res.status(400).json(errors)
      }

      next()
   }
}
