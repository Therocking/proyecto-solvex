import { Router } from "express";
import { PostgreProjectRepository } from "../../infracstructure/repositories/projects/project.postgre.repository";
import { ProjectsService } from "../services/projects.services";
import { ProjectsController } from "./controllers";


class ProjectsRoutes {

  public static get Routes(): Router {
     const routes = Router()

     const repository = new PostgreProjectRepository()
     const service = new ProjectsService(repository)
     const controller = new ProjectsController(service)

     routes.get("/", controller.GetAll)
     routes.post("/", controller.Create)
     routes.put("/:id", controller.Update)
     routes.delete("/:id", controller.Delete)

     return routes
  } 
} 

export default ProjectsRoutes
