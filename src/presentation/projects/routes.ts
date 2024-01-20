import { Router } from "express";


class ProjectsRoutes {

  public static get Routes(): Router {
     const routes = Router()

     routes.get("/")
     routes.post("/")
     routes.put("/:id")
     routes.delete("/:id")

     return routes
  } 
} 

export default ProjectsRoutes
