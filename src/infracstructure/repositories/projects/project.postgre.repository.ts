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

   public async CreateProject(project: PostProject): Promise<Project> {
      const projectToCreate = await PrismaDb.prisma.project.create({
	 data: project
      })
      
      return projectToCreate
   }

   public async UpdateProject(project: PutProject): Promise<Project> {
      const {id, ...data} = project

      const projectToUpdate = await PrismaDb.prisma.project.update({
	 where: {id},
	 data
      })

      return projectToUpdate
   }

   public async DeleteProject(id: string): Promise<Project> {
      const projectToDelete = await PrismaDb.prisma.project.delete({
	 where: {id}
      })

      return projectToDelete
   }
}
