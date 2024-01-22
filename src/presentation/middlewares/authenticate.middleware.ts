import { NextFunction, Request, Response } from "express";
import { PostgreUserRepository } from "../../infracstructure/repositories";
import { JwtAdapter } from "../../adapters/jwt.adapter";
import { CustomHttpErrors } from "../../helpers";
import { DicErrors } from "../../errors/diccionaryErrors";
import { envs } from "../../adapters";
import { User } from "../../interfaces";

export class AuthMiddleware {

   public validUser = async(req: Request, res: Response, next: NextFunction) => {
      try{
	 const auth = req.header('Authorization');
	 if(!auth) return res.status(401).json({ error: DicErrors.MISSING_TOKEN})
	 if(!auth.startsWith('Bearer ')) return res.status(401).json({error:DicErrors.INVALID_TOKEN})

	 // Split the string with the token and take the second position
	 const token = auth.split(' ').at(1) || '';
	 
	 // Get the payload in the token
	 const payload = await this.GetPayload(token)
	 if(!payload) return res.status(401).json({error: DicErrors.INVALID_TOKEN})

	 // Get the user with the id in the payload
	 const user = await this.GetUser(payload.id)
	 if(!user) return res.status(404).json({error: DicErrors.USER_NOT_FOUND});

	 req.body.user = user;

	 next();

      }catch(error) {
	 console.log(error)
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   private async GetUser(id: string): Promise<User | null> {
      const userRepository = new PostgreUserRepository()
      const user = await userRepository.GetUserById( id );
      return user 
   }

   private async GetPayload(token: string): Promise<{id: string} | null> {
      const jwtAdapter = new JwtAdapter(envs.JWTSEED)
      const payload = await jwtAdapter.Verify<{id: string}>(token)
      return payload
   }
} 
