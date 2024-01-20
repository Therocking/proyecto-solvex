import PrismaDb from "../../db/prismaClient"
import { PostProject, Project, PutProject } from "../../interfaces/projects.interface"

abstract class ProjectRepository {
   public abstract GetAllProjects(): Promise<Project[]>
   public abstract CreateProject(project: PostProject): Promise<Project>
   public abstract UpdateProject(project: PutProject): Promise<Project>
   public abstract DeleteProject(id: string): Promise<Project>
}

export class PostgreRepository implements ProjectRepository {
   
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
