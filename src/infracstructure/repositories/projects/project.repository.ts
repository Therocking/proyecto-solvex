import { PostProject, Project, PutProject } from "../../../interfaces/projects.interface";

export abstract class ProjectRepository {
   public abstract GetProjectById(id: string): Promise<Project>
   public abstract GetAllProjects(): Promise<Project[]>
   public abstract CreateProject(dataForPost: PostProject): Promise<Project>
   public abstract UpdateProject(dataForUpdate: PutProject): Promise<Project>
   public abstract DeleteProject(id: string): Promise<Project>
}