import { PostProject, Project, PutProject } from "../../../interfaces/projects.interface";

export abstract class ProjectRepository {
   public abstract GetProjectById(id: string): Promise<Project>
   public abstract GetAllProjects(): Promise<Project[]>
   public abstract CreateProject(project: PostProject): Promise<Project>
   public abstract UpdateProject(project: PutProject): Promise<Project>
   public abstract DeleteProject(id: string): Promise<Project>
}
