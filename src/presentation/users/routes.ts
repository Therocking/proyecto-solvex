import { Router } from "express";
import { UsersController } from "./controllers";
import { PostgreUserRepository } from "../../infracstructure/repositories";
import { UsersService } from "../services/users.services";
import { AuthMiddleware } from "../middlewares/authenticate.middleware";
import { check } from "express-validator";
import { DicErrors } from "../../errors/diccionaryErrors";
import { ShowExpressValidatorErrors } from "../middlewares/showErrors.middleware";
import { DbValidators } from "../../helpers/dbValidators.helper";
import { ValidIfUserIsOwner } from "../middlewares/userOwner.middleware";


class UsersRoutes {

  public static get Routes(): Router {
     const routes = Router()

     const repository = new PostgreUserRepository()
     const service = new UsersService(repository)
     const controller = new UsersController(service)

     /*Middleware classes*/
     const authMiddleware = new AuthMiddleware()
     const dbValidators = new DbValidators()

     routes.get("/",
	 //authMiddleware.validUser
     controller.GetAll)

     routes.put("/:id",[
	authMiddleware.validUser,
	check("id", DicErrors.MISSING_ID).notEmpty(),
	check("id").custom(dbValidators.ExistUserById),
	check("id").custom(ValidIfUserIsOwner.IsUserOwnerAccount),
	ShowExpressValidatorErrors.validFields // Show the errors of check
     ],controller.Update)

     routes.delete("/:id",[
	authMiddleware.validUser,
	check("id", DicErrors.MISSING_ID).notEmpty(),
	check("id").custom(dbValidators.ExistUserById),
	check("id").custom(ValidIfUserIsOwner.IsUserOwnerAccount),
	ShowExpressValidatorErrors.validFields // Show the errors of check
     ],controller.Delete)

     return routes
  } 
} 

export default UsersRoutes
