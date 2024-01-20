import { Router } from "express";


class UsersRoutes {

  public static get Routes(): Router {
     const routes = Router()

     routes.get("/")
     routes.post("/")
     routes.put("/:id")
     routes.delete("/:id")

     return routes
  } 
} 

export default UsersRoutes
