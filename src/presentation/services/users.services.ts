import { BcryptAdapter } from "../../adapters/bcrypt.adapter";
import { CustomHttpErrors } from "../../helpers/customHttpErrors.helper";
import { UserRepository } from "../../infracstructure/repositories/users/user.repository";
import { GetUser, PutUser } from "../../interfaces/users.interface";
import { DicErrors } from "../../errors/diccionaryErrors";
import { ApiCache } from "../../adapters";

export class UsersService {
   constructor(
      private readonly repository: UserRepository
   ) {}

   private GetPagination(total: number, dataForGet: GetUser) {
	 const skipMinusLimit = dataForGet.skip - dataForGet.limit

	 const pagination = {
	    total,
	    skip: dataForGet.skip,
	    limit: dataForGet.limit,
	    next: `/api/users?skip=${dataForGet.skip + 1}&limit=${dataForGet.limit}`,
	    prev: (skipMinusLimit < 0)? null : `/api/users?skip=${skipMinusLimit}&limit=${dataForGet.limit}`,
	 }

	 return pagination
   }

   public async GetOne(userId: string) {
      try {
	 const user = await this.repository.GetUserById(userId)


	 return user
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async GetAll(dataForGet: GetUser) {
      try {
	 const [users, total] = await Promise.all([
	    this.repository.GetAllUsers(dataForGet),
	    this.repository.GetDocuments()
	 ])

	 const usersWithOutPass = users.map(user => {
	    const {password, ...data} = user

	    return data
	 })

	 // Pagination
	 const pagination = this.GetPagination(total, dataForGet)

	 return { 
	    pagination,
	    users: usersWithOutPass
	 }
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   } 

   public async Update(dataForUpdate: PutUser) {
      ApiCache.Cache.clear("/api/users/") /*Clear the cache on users routes*/
      ApiCache.Cache.clear(`/api/users/${dataForUpdate.id}`) /*Clear the cache on users routes*/
      try {
	 if(dataForUpdate.password) {
	    dataForUpdate.password = BcryptAdapter.hash(dataForUpdate.password)
	 }

	 const user = await this.repository.UpdateUser(dataForUpdate)

	 return user
      }catch(err) {
	 console.log(err)
 	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Delete(id: string) {
      ApiCache.Cache.clear("/api/users/") /*Clear the cache on users routes*/
      ApiCache.Cache.clear(`/api/users/${id}`) /*Clear the cache on users routes*/
      try {
	 const user = await this.repository.DeleteUser(id)

	 return user
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }
}
