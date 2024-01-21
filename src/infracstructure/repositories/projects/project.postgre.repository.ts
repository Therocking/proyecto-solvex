import PrismaDb from "../../../db/prismaClient"
import { PostProject, Project, PutProject } from "../../../interfaces/projects.interface"
import { ProjectRepository } from "./project.repository"


export class PostgreProjectRepository implements ProjectRepository {

   public async GetProjectById(id: string): Promise<Project> {
       const project = await PrismaDb.prisma.project.findFirst({
	  where: {id}
       })

       return project! // Indica que nunca sera nulo
   }
   
   public async GetAllProjects(): Promise<Project[]> {
      // TODO: Paginacion
      const projects = await PrismaDb.prisma.project.findMany()

      return projects
   }

   public async CreateProject(dataForPost: PostProject): Promise<Project> {
      const project= await PrismaDb.prisma.project.create({
	 data: dataForPost
      })
      
      return project
   }

   public async UpdateProject(dataForUpdate: PutProject): Promise<Project> {
      const {id, ...data} = dataForUpdate

      const project= await PrismaDb.prisma.project.update({
	 where: {id},
	 data
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
