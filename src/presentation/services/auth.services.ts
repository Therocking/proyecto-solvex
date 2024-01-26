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
	 // Hash user password
	 dataForPost.password = BcryptAdapter.hash(dataForPost.password)

	 const user = await this.repository.CreateUser(dataForPost)

	 const token = await this.jwt.Generate({id: user.id})

	 return {
	    user,
	    token
	 }

      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Login(mail: string, password: string) {
      try {
	 const user = await this.repository.GetUserByMail(mail)
	 // If no exist throw a 404 http error
	 if(!user) throw CustomHttpErrors.NotFound(DicErrors.USER_NOT_FOUND)

	 // Verify if the hashed pass and the pass in args are the same
	 const isCorrectPass = BcryptAdapter.compare(password, user!.password)
	 if(!isCorrectPass) throw CustomHttpErrors.BadRequest(DicErrors.INCORRECT_PASS)

	 const token = await this.jwt.Generate({id: user!.id})

	 return {
	    user,
	    token
	 }
      }catch(err) {
	 console.log(err)
	 if(err instanceof CustomHttpErrors) throw err
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }
}
