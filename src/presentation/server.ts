import express, {Router} from "express";
import cors from "cors";

interface Opts {
   port: number
   routes: Router
}

export class Server {
   private readonly app = express()
   private readonly port: number
   private readonly routes: Router

   constructor(opts: Opts) {
      this.port = opts.port
      this.routes = opts.routes
   }

    public Start(): void {
      /*middlewares*/
      this.app.use( cors() )
      this.app.use( express.json() )
      this.app.use( this.routes )
      

      // Ruta por defecto 
      this.app.get( "*", (_req, res) => {
	 res.status(404).json({msg: "not found"})
      })

      /*listen*/
      this.Listen()
   }

   private Listen(): void {
      this.app.listen(this.port, () => {
	 console.log("Server ready at:", this.port)
      })
   }
}
