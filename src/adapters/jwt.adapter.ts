import jwt from "jsonwebtoken"

export class JwtAdapter {
   constructor(
      private readonly jwtSeed: string
   ){}
   
   public Generate(payload: {[key: string]: any} , duration: string = '3h'): Promise<string | null> {
       
      return new Promise( (resolve => {
	 jwt.sign(payload, this.jwtSeed, {expiresIn: duration}, (error, token) => {
	    if(error) resolve(null);

	    resolve(token!);
	 });
      }));
   }

   public Verify<T>(token: string): Promise<T | null> {
      return new Promise( (resolve) => {
	 jwt.verify(token, this.jwtSeed, (error, decode) => {
	    if(error) resolve(null)

	    resolve(decode as T)
	 })
      })
   } 
}
