import PrismaDb from "../../../db/prismaClient";
import { GetUser, PostUser, PutUser, User } from "../../../interfaces/users.interface";
import { UserRepository } from "./user.repository";


export class PostgreUserRepository implements UserRepository {

   public async GetDocuments(): Promise<number> {
      const total = await PrismaDb.prisma.user.count()
      
      return total
   }

   public async GetUserById(id: string): Promise<User | null> {
       const user = await PrismaDb.prisma.user.findFirst({
	  where: {id}
       })

       return user
   }

   public async GetUserByMail(mail: string): Promise<User | null> {
      const user = await PrismaDb.prisma.user.findFirst({
	 where: {mail}
      })

      return user
   }

   public async GetAllUsers(dataForGet: GetUser): Promise<User[]> {
       const users = await PrismaDb.prisma.user.findMany({
	  skip: dataForGet.skip, /*To skip a certien number of results*/
	  take: dataForGet.limit, /*To limit a certien number of results*/
	  orderBy: {name: "asc"}, /*To order by name ascendant*/
       });

       return users
   }

   public async CreateUser(dataForPost: PostUser): Promise<User> {
       const user = await PrismaDb.prisma.user.create({
	  data: dataForPost
       })

       return user
   }

   public async UpdateUser(dataForUpdate: PutUser): Promise<User> {
      const {id, ...data} = dataForUpdate

       const user = await PrismaDb.prisma.user.update({
	  where: {id},
	  data: {name: data.name, password: data.password}
       })

       return user
   }

   public async DeleteUser(id: string): Promise<User> {
       const user = await PrismaDb.prisma.user.delete({
	  where: {id}
       })

       return user
   }
}
