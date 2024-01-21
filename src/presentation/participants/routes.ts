import { Router } from "express";
import { PostgreParticipantRepository } from "../../infracstructure/repositories";
import { ParticipantsService } from "../services/participants.services";
import { ParticipantsController } from "./controllers";



export class ParticipatsRoutes {

   public static get Routes(): Router {
      const routes = Router()

      const repository = new PostgreParticipantRepository()
      const service = new ParticipantsService(repository)
      const controller = new ParticipantsController(service)

      routes.get("/", controller.GetAll)
      routes.post("/project/:project_id/user/:user_id", controller.Create)
      routes.delete("/project/:project_id/user/:user_id", controller.Delete)

      return routes
   }
}
