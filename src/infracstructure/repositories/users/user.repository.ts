import { GetUser, PostUser, PutUser, User } from "../../../interfaces/users.interface";


export abstract class UserRepository {
   public abstract GetDocuments(): Promise<number>
   public abstract GetUserById(id: string): Promise<User | null>
   public abstract GetUserByMail(mail: string): Promise<User | null>
   public abstract GetAllUsers(dataForGet: GetUser): Promise<User[]>
   public abstract CreateUser(dataForPost: PostUser): Promise<User>
   public abstract UpdateUser(dataForUpdate: PutUser): Promise<User>
   public abstract DeleteUser(id: string): Promise<User>
}
