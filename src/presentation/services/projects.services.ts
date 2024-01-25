import { DicErrors } from "../../errors/diccionaryErrors"
import { CustomHttpErrors } from "../../helpers"
import { PostgreProjectRepository } from "../../infracstructure/repositories"
import { GetProject, PostProject, PutProject } from "../../interfaces"


export class ProjectsService {
   constructor(
      private readonly repository: PostgreProjectRepository
   ){}

   private GetPagination(total: number, dataForGet: GetProject) {
	 const limitMenusOne = dataForGet.limit - 1

	 const pagination = {
	    total,
	    skip: dataForGet.skip,
	    limit: dataForGet.limit,
	    next: `/api/project?skip=${dataForGet.skip}&limit=${dataForGet.limit + 1}`,
	    prev: (limitMenusOne < 1)? null : `/api/project?skip=${dataForGet.skip}&limit=${dataForGet.limit + 1}`,
	 }

	 return pagination
   }

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
	 const [projects, total] = await Promise.all([
	    this.repository.GetAllProjects(dataForGet),
	    this.repository.GetDocuments()
	 ])

	 // Add endpoint to creator user and participants
	 const projectsWithCreators = projects.map(project => {
	    const {user_id, ...data} = project

	    const resp = {
	       ...data,
	       creator: `/api/users/${project.user_id}`,
	       participants: `/api/participants/project/${project?.id}`
	    }

	    return resp
	 })

	 // Pagination
	 const pagination = this.GetPagination(total, dataForGet)

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
