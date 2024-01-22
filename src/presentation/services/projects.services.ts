import { DicErrors } from "../../errors/diccionaryErrors"
import { CustomHttpErrors } from "../../helpers"
import { PostgreProjectRepository } from "../../infracstructure/repositories"
import { PostProject, PutProject } from "../../interfaces"


export class ProjectsService {
   constructor(
      private readonly repository: PostgreProjectRepository
   ){}

   public async GetAll(userId: string) {
      try {
	 const projects = await this.repository.GetAllProjects(userId)

	 return projects
      }catch(err) {
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Create(dataForPost: PostProject) {
      try {
	 const project = await this.repository.CreateProject(dataForPost)

	 return project
      }catch(err) {
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Update(dataForUpdate: PutProject) {
      try {
	 const project = await this.repository.UpdateProject(dataForUpdate)

	 return project
      }catch(err) {
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Delete(id: string) {
      try {
	 const project = await this.repository.DeleteProject(id)

	 return project
      }catch(err) {
	 CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }
}
