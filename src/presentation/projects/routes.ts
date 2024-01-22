import { Router } from "express";
import { ProjectsService } from "../services/projects.services";
import { ProjectsController } from "./controllers";
import { PostgreProjectRepository } from "../../infracstructure/repositories";
import { AuthMiddleware } from "../middlewares/authenticate.middleware";
import { check } from "express-validator";
import { DicErrors } from "../../errors/diccionaryErrors";
import { ShowExpressValidatorErrors } from "../middlewares/showErrors.middleware";
import { DbValidators } from "../../helpers/dbValidators.helper";


class ProjectsRoutes {

  public static get Routes(): Router {
     const routes = Router()

     const repository = new PostgreProjectRepository()
     const service = new ProjectsService(repository)
     const controller = new ProjectsController(service)

     const authMiddleware = new AuthMiddleware()
     const dbValidators = new DbValidators()

     routes.get("/", 
	 authMiddleware.validUser
     ,controller.GetAll)

     routes.post("/",[
	authMiddleware.validUser,
	check("name", DicErrors.MISSING_NAME).isString(),
	check("user_id", DicErrors.MISSING_ID).notEmpty(),
	check("user_id", DicErrors.ID_FORMAT_INCORRECT).isUUID(),
	check("user_id").custom(dbValidators.ExistUserById),
	ShowExpressValidatorErrors.validFields// Show the errors of check

     ],controller.Create)

     routes.put("/:id",[
	authMiddleware.validUser,
	check("id", DicErrors.MISSING_ID).notEmpty(),
	check("id", DicErrors.ID_FORMAT_INCORRECT).isUUID(),
	check("id").custom(dbValidators.ExistUserById),
	ShowExpressValidatorErrors.validFields// Show the errors of check

     ],controller.Update)

     routes.delete("/:id",[
	authMiddleware.validUser,
	check("id", DicErrors.MISSING_ID).notEmpty(),
	check("id", DicErrors.ID_FORMAT_INCORRECT).isUUID(),
	check("id").custom(dbValidators.ExistUserById),
	ShowExpressValidatorErrors.validFields// Show the errors of check

     ],controller.Delete)

     return routes
  } 
} 

export default ProjectsRoutes
