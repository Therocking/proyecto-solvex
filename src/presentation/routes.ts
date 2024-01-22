import { Router } from "express";
import ProjectsRoutes from "./projects/routes";
import UsersRoutes from "./users/routes";
import { ParticipatsRoutes } from "./participants/routes";
import AuthRoutes from "./auth/routes";


class AppRoutes {

   static get Routes(): Router {
      const routes = Router()

      routes.use("/api/projects", ProjectsRoutes.Routes)
      routes.use("/api/users", UsersRoutes.Routes)
      routes.use("/api/participants", ParticipatsRoutes.Routes)
      routes.use("/api/auth", AuthRoutes.Routes)

      return routes
   }
}

export default AppRoutes
