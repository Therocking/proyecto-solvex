import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";
import { CustomHandleError } from "../../helpers";


export class AuthController {
   constructor(
      private readonly service: AuthService
   ) {}

   public Register = (req: Request, res: Response) => {
      this.service.Register(req.body)
	 .then(resp => res.status(201).json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Login = (req: Request, res: Response) => {
      const {mail, password} = req.body

      this.service.Login(mail, password)
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }
}
