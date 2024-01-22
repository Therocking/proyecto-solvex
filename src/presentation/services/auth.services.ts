import { BcryptAdapter } from "../../adapters"
import { JwtAdapter } from "../../adapters/jwt.adapter"
import { CustomHttpErrors } from "../../helpers"
import { UserRepository } from "../../infracstructure/repositories"
import { PostUser } from "../../interfaces"
import { DicErrors } from "../../errors/diccionaryErrors"

export class AuthService{
   constructor(
      private readonly repository: UserRepository,
      private readonly jwt: JwtAdapter
   ) {}

   public async Register(dataForPost: PostUser) {
      try {
	 // Encripata el pass del usuario
	 dataForPost.password = BcryptAdapter.hash(dataForPost.password)

	 const user = await this.repository.CreateUser(dataForPost)

	 const token = await this.jwt.Generate({id: user.id})

	 return {
	    user,
	    token
	 }

      }catch(err) {
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Login(mail: string, password: string) {
      try {
	 const user = await this.repository.GetUserByMail(mail)
	 if(user === null) return CustomHttpErrors.NotFound(DicErrors.USER_NOT_FOUND)

	 // Verify if the hashed pass and the pass in args are the same
	 const isCorrectPass = BcryptAdapter.compare(password, user!.password)
	 if(!isCorrectPass) return CustomHttpErrors.BadRequest(DicErrors.INCORRECT_PASS)

	 const token = await this.jwt.Generate({id: user!.id})

	 return {
	    user,
	    token
	 }
      }catch(err) {
      console.log(err)
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }
}
