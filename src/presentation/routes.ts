import { Router } from "express";
import ProjectsRoutes from "./projects/routes";
import UsersRoutes from "./users/routes";


class AppRoutes {

   static get Routes(): Router {
      const routes = Router()

      routes.use("/api/projects", ProjectsRoutes.Routes)
      routes.use("/api/users", UsersRoutes.Routes)

      return routes
   }
}

export default AppRoutes
