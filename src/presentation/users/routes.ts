import { Router } from "express";
import { PostgreUserRepository } from "../../infracstructure/repositories/users/user.postgre.repository";
import { UsersService } from "../services/users.services";
import { UsersController } from "./controllers";


class UsersRoutes {

  public static get Routes(): Router {
     const routes = Router()

     const repository = new PostgreUserRepository()
     const service = new UsersService(repository)
     const controller = new UsersController(service)

     routes.get("/", controller.GetAll)
     routes.post("/", controller.Create)
     routes.put("/:id", controller.Update)
     routes.delete("/:id", controller.Delete)

     return routes
  } 
} 

export default UsersRoutes
