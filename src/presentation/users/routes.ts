import { Router } from "express";
import { UsersController } from "./controllers";
import { PostgreUserRepository } from "../../infracstructure/repositories";
import { UsersService } from "../services/users.services";


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
