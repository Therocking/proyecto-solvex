import { Router } from "express";
import { PostgreParticipantRepository } from "../../infracstructure/repositories";
import { ParticipantsService } from "../services/participants.services";
import { ParticipantsController } from "./controllers";
import { AuthMiddleware } from "../middlewares/authenticate.middleware";
import { check } from "express-validator";
import { DicErrors } from "../../errors/diccionaryErrors";
import { ShowExpressValidatorErrors } from "../middlewares/showErrors.middleware";
import { DbValidators } from "../../helpers/dbValidators.helper";
import { ExistIn } from "../middlewares/existIn.middleware";



export class ParticipatsRoutes {

   public static get Routes(): Router {
      const routes = Router()

      const repository = new PostgreParticipantRepository()
      const service = new ParticipantsService(repository)
      const controller = new ParticipantsController(service)

     /*Middleware classes*/
      const authMiddleware = new AuthMiddleware()
      const dbValidators = new DbValidators()

      routes.get("/project/:project_id",
	 authMiddleware.validUser,
	 check("project_id", DicErrors.MISSING_ID).notEmpty(),
	 check("project_id", DicErrors.ID_FORMAT_INCORRECT).isUUID(),
	 ShowExpressValidatorErrors.validFields
      ,controller.GetAll)

      routes.post("/project/:project_id/user/:user_id",[
	 authMiddleware.validUser,
	 check("project_id", DicErrors.MISSING_ID).notEmpty(),
	 check("project_id", DicErrors.ID_FORMAT_INCORRECT).isUUID(),
	 check("project_id").custom(dbValidators.ProjectExistById),
	 check("user_id", DicErrors.MISSING_ID).notEmpty(),
	 check("user_id", DicErrors.ID_FORMAT_INCORRECT).isUUID(),
	 check("user_id").custom(dbValidators.ExistUserById),
	 ExistIn.ExistUserInTheProject,// Check if the user is participant
	 check("rol", DicErrors.MISSING_ROL).notEmpty().isString(),
	 ShowExpressValidatorErrors.validFields// Show the errors of check

      ],controller.Create)

      routes.delete("/project/:project_id/user/:user_id",[
	 authMiddleware.validUser,
	 check("project_id", DicErrors.MISSING_ID).notEmpty(), // Search for id
	 check("project_id", DicErrors.ID_FORMAT_INCORRECT).isUUID(), // Check the format of the id
	 check("project_id").custom(dbValidators.ProjectExistById), // Check if the project exist
	 check("user_id", DicErrors.MISSING_ID).notEmpty(),// Search for id
	 check("user_id", DicErrors.ID_FORMAT_INCORRECT).isUUID(),// Check the format of the id
	 check("user_id").custom(dbValidators.ExistUserById), // Check if the user exist
	 ExistIn.ExistUserInProjectToRemoveIt, // Check if the user is participant to remove it
	 ShowExpressValidatorErrors.validFields// Show the errors of check
      ],controller.Delete)

      return routes
   }
}
