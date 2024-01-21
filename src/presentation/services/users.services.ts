import { BcryptAdapter } from "../../adapters/bcrypt.adapter";
import { CustomHttpErrors } from "../../helpers/customHttpErrors.helper";
import { UserRepository } from "../../infracstructure/repositories/users/user.repository";
import { PostUser, PutUser } from "../../interfaces/users.interface";


export class UsersService {
   constructor(
      private readonly repository: UserRepository
   ) {}

   public async GetAll() {
      try {
	 const users = await this.repository.GetAllUsers()

	 return users
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en GetAll - userServices")
      }
   }

   public async Create(dataForPost: PostUser) {
      try {
	 // Encripata el pass del usuario
	 dataForPost.password = BcryptAdapter.hash(dataForPost.password)

	 const user = await this.repository.CreateUser(dataForPost)

	 return user
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en Create - userServices")
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
	 CustomHttpErrors.InternalError("Error en Update - userServices")
      }
   }

   public async Delete(id: string) {
      try {
	 const user = await this.repository.DeleteUser(id)

	 return user
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en Delete - userServices")
      }
   }
}
