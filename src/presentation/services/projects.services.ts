import { CustomHttpErrors } from "../../helpers"
import { PostgreProjectRepository } from "../../infracstructure/repositories"
import { PostProject, PutProject } from "../../interfaces"


export class ProjectsService {
   constructor(
      private readonly repository: PostgreProjectRepository
   ){}

   public async GetAll() {
      try {
	 const projects = await this.repository.GetAllProjects()

	 return projects
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en GetAll func - proyectos")
      }
   }

   public async Create(dataForPost: PostProject) {
      try {
	 const project = await this.repository.CreateProject(dataForPost)

	 return project
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en Create func - proyectos")
      }
   }

   public async Update(dataForUpdate: PutProject) {
      try {
	 const project = await this.repository.UpdateProject(dataForUpdate)

	 return project
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en update func - proyectos")
      }
   }

   public async Delete(id: string) {
      try {
	 const project = await this.repository.DeleteProject(id)

	 return project
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en Delete fun - proyects")
      }
   }
}
