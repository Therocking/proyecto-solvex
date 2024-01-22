import { DicErrors } from "../errors/diccionaryErrors";
import { PostgreProjectRepository, PostgreUserRepository } from "../infracstructure/repositories";


export class DbValidators {
   private readonly UserRepository = new PostgreUserRepository()
   private readonly ProjectRepository = new PostgreProjectRepository()

   public ExistUserByMail = async(mail: string) => {
      const user = await this.UserRepository.GetUserByMail(mail)

      if(user) throw DicErrors.MAIL_IN_USE
   }

   public ExistUserById = async(id: string) => {
      const user = await this.UserRepository.GetUserById(id)

      if(!user) throw DicErrors.USER_NOT_FOUND
   }
   
   public ProjectExistById = async(id: string) => {
      const project = await this.ProjectRepository.GetProjectById(id)

      if(!project) throw DicErrors.PROJECT_NOT_FOUND
   }
}
