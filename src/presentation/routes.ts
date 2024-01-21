import { Router } from "express";
import ProjectsRoutes from "./projects/routes";
import UsersRoutes from "./users/routes";
import { ParticipatsRoutes } from "./participants/routes";


class AppRoutes {

   static get Routes(): Router {
      const routes = Router()

      routes.use("/api/projects", ProjectsRoutes.Routes)
      routes.use("/api/users", UsersRoutes.Routes)
      routes.use("/api/participants", ParticipatsRoutes.Routes)

      return routes
   }
}

export default AppRoutes
