import { Router } from "express";
import { AuthService } from "../services/auth.services";
import { JwtAdapter } from "../../adapters/jwt.adapter";
import { envs } from "../../adapters";
import { AuthController } from "./controller";
import { PostgreUserRepository } from "../../infracstructure/repositories";
import { check } from "express-validator";
import { DicErrors } from "../../errors/diccionaryErrors";
import { ShowExpressValidatorErrors } from "../middlewares/showErrors.middleware";
import { DbValidators } from "../../helpers/dbValidators.helper";


class AuthRoutes {

  public static get Routes(): Router {
    const routes = Router()

    const jwt = new JwtAdapter(envs.JWTSEED)
    const repository = new PostgreUserRepository()
    const service = new AuthService(repository, jwt)
    const controller = new AuthController(service)

    /*Middleware classes*/
    const dbValidators = new DbValidators()

    routes.post("/register", [
      check("mail", DicErrors.MISSING_MAIL).notEmpty().isEmail(),
      check("mail").custom(dbValidators.ExistUserByMail), // Check if mail exist
      check("password", DicErrors.MISSING_PASS).notEmpty(),
      check("password", DicErrors.PASS_MUST_BE_STRING).isString(), // Check if pass is a string
      check("name", DicErrors.MISSING_NAME).notEmpty(),
      check("name", DicErrors.NAME_MUST_BE_STRING).isString(), // Check if name is a string
      ShowExpressValidatorErrors.validFields// Show the errors of check
    ], controller.Register)

    routes.post("/login", [
      check("mail", DicErrors.MISSING_MAIL).notEmpty().isEmail(),
      check("password", DicErrors.MISSING_PASS).notEmpty(),
      check("password", DicErrors.PASS_MUST_BE_STRING).isString(),
      ShowExpressValidatorErrors.validFields// Show the errors of check
    ], controller.Login)

    routes.post("/google", controller.GoogleSignIn)

    return routes
  }
}

export default AuthRoutes
