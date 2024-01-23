import { DicErrors } from "../../errors/diccionaryErrors"
import { CustomHttpErrors } from "../../helpers"
import { PostgreProjectRepository } from "../../infracstructure/repositories"
import { GetProject, PostProject, PutProject } from "../../interfaces"


export class ProjectsService {
   constructor(
      private readonly repository: PostgreProjectRepository
   ){}

   public async GetOne(id: string) {
      try {
	 const project = await this.repository.GetProjectById(id)

	 // Add endpoint to creator user and to participants of the project
	 const resp = { ...project,
	    creator: `/api/users/${project?.user_id}`,
	    participants: `/api/participants/project/${project?.id}`
	 }

	 return {
	    project: resp
	 }
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async GetAll(dataForGet: GetProject) {
      try {
	 const projects = await this.repository.GetAllProjects(dataForGet)

	 // Add endpoint to creator user
	 const projectsWithCreators = projects.map(p => {
	    const {user_id, ...data} = p

	    return {
	       ...data,
	       creator: `/api/users/${p.user_id}`
	    }
	 })

	 const pagination = {
	    skip: dataForGet.skip,
	    limit: dataForGet.limit
	 }

	 return {
	    pagination,
	    projects: projectsWithCreators
	 }
      }catch(err) {
	throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Create(dataForPost: PostProject) {
      try {
	 const project = await this.repository.CreateProject(dataForPost)

	 return project
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Update(dataForUpdate: PutProject) {
      try {
	 const project = await this.repository.UpdateProject(dataForUpdate)

	 return project
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Delete(id: string) {
      try {
	 const project = await this.repository.DeleteProject(id)

	 return project
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }
}
