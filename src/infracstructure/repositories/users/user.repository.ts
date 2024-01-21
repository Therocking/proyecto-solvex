import { PostUser, PutUser, User } from "../../../interfaces/users.interface";


export abstract class UserRepository {
   public abstract GetUserById(id: string): Promise<User>
   public abstract GetAllUsers(): Promise<User[]>
   public abstract CreateUser(dataForPost: PostUser): Promise<User>
   public abstract UpdateUser(dataForUpdate: PutUser): Promise<User>
   public abstract DeleteUser(id: string): Promise<User>
}
