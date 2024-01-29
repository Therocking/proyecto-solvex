import { OAuth2Client } from "google-auth-library"
import { BcryptAdapter, envs } from "../../adapters"
import { JwtAdapter } from "../../adapters/jwt.adapter"
import { CustomHttpErrors } from "../../helpers"
import { UserRepository } from "../../infracstructure/repositories"
import { PostUser } from "../../interfaces"
import { DicErrors } from "../../errors/diccionaryErrors"

export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwt: JwtAdapter
  ) { }

  public async Register(dataForPost: PostUser) {
    try {
      // Hash user password
      dataForPost.password = BcryptAdapter.hash(dataForPost.password)

      const user = await this.repository.CreateUser(dataForPost)

      const token = await this.jwt.Generate({ id: user.id })

      return {
        user,
        token
      }

    } catch (err) {
      throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
    }
  }

  public async Login(mail: string, password: string) {
    try {
      const user = await this.repository.GetUserByMail(mail)
      // If no exist throw a 404 http error
      if (!user) throw CustomHttpErrors.NotFound(DicErrors.USER_NOT_FOUND)

      // Verify if the hashed pass and the pass in args are the same
      const isCorrectPass = BcryptAdapter.compare(password, user!.password)
      if (!isCorrectPass) throw CustomHttpErrors.BadRequest(DicErrors.INCORRECT_PASS)

      const token = await this.jwt.Generate({ id: user!.id })

      return {
        user,
        token
      }
    } catch (err) {
      console.log(err)
      if (err instanceof CustomHttpErrors) throw err
      throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
    }
  }

  public async GoogleSignIn(token: string) {
    try {
      // Valid the google token
      const googleToken = await this.verifyGoogleToken(token)
      if (!googleToken) throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)

      const user = await this.repository.GetUserByMail(googleToken.email!)

      // password to test the google sign-in
      const testPass = "1234"

      if (!user) {
        // if user do not exist in db then create register the user in db
        const userToRegister = { name: googleToken.name!, mail: googleToken.email!, password: testPass }
        const registerResp = await this.Register(userToRegister)

        return registerResp
      } else {
        // if user exist in db just login the user
        const loginUser = await this.Login(googleToken.email!, testPass)

        return loginUser
      }
    } catch (err) {
      throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
    }
  }

  // Method to valid the google token
  private async verifyGoogleToken(token: string) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: envs.GOOGLE_SECRECT_ID,// Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return payload
  }
}
