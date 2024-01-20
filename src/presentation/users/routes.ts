import { Router } from "express";
import ProjectsRoutes from "../projects/routes";


class UsersRoutes {

  public static get Routes(): Router {
     const routes = Router()

     routes.use("api/projects", ProjectsRoutes.Routes)

     return routes
  } 
} 

export default UsersRoutes
