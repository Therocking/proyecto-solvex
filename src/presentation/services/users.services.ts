import { BcryptAdapter } from "../../adapters/bcrypt.adapter";
import { JwtAdapter } from "../../adapters/jwt.adapter";
import { CustomHttpErrors } from "../../helpers/customHttpErrors.helper";
import { UserRepository } from "../../infracstructure/repositories/users/user.repository";
import { PostUser, PutUser } from "../../interfaces/users.interface";
import { DicErrors } from "../../errors/diccionaryErrors";

export class UsersService {
   constructor(
      private readonly repository: UserRepository
   ) {}

   public async GetAll() {
      try {
	 const users = await this.repository.GetAllUsers()

	 return users
      }catch(err) {
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   } 

   public async Update(dataForUpdate: PutUser) {
      try {
	 if(dataForUpdate.password) {
	    dataForUpdate.password = BcryptAdapter.hash(dataForUpdate.password)
	 }

	 const user = await this.repository.UpdateUser(dataForUpdate)

	 return user
      }catch(err) {
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Delete(id: string) {
      try {
	 const user = await this.repository.DeleteUser(id)

	 return user
      }catch(err) {
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }
}
