import PrismaDb from "../../../db/prismaClient"
import { GetProject, PostProject, Project, PutProject } from "../../../interfaces/projects.interface"
import { ProjectRepository } from "./project.repository"


export class PostgreProjectRepository implements ProjectRepository {

   public async GetDocuments(): Promise<number> {
       const total = await PrismaDb.prisma.project.count()

       return total
   }

   public async GetProjectById(id: string): Promise<Project | null> {
       const project = await PrismaDb.prisma.project.findFirst({
	  where: {id}
       })

       return project 
   }
   
   public async GetAllProjects(dataForGet: GetProject): Promise<Project[]> {
      // TODO: Paginacion
      const projects = await PrismaDb.prisma.project.findMany({
	 where: { /*To filter by user_id and name of the project*/
	    user_id: dataForGet.user_id,
	    name: {
	       contains: dataForGet.name
	    }
	 }, 
	 skip: dataForGet.skip, /*To skip a certien number of results*/
	 take: dataForGet.limit, /*To limit a certein number of results*/
	 orderBy: {name: "asc"} /*To order by nama ascendant*/
      })

      return projects
   }

   public async CreateProject(dataForPost: PostProject): Promise<Project> {
      const project= await PrismaDb.prisma.project.create({
	 data: {
	    name: dataForPost.name,
	    user_id: dataForPost.user_id
	 } 
      })
      
      return project
   }

   public async UpdateProject(dataForUpdate: PutProject): Promise<Project> {
      const {id, ...data} = dataForUpdate

      const project= await PrismaDb.prisma.project.update({
	 where: {id},
	 data: {name: data.name, description: data.description}
      })

      return project
   }

   public async DeleteProject(id: string): Promise<Project> {
      const projectToDelete = await PrismaDb.prisma.project.delete({
	 where: {id}
      })

      return projectToDelete
   }
}
