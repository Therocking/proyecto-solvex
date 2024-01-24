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
      this.Middleware()

      /*routes*/      
      this.Routes()

      /*listen*/
      this.Listen()
   }

   private Middleware(): void {
      this.app.use( cors() )
      this.app.use( express.json() )
      this.app.use( this.routes )
   }

   private Routes(): void {
      this.app.get( "/", (_req, res) => {
	 res.sendFile(process.cwd() + "/public/index.html")
      })

      this.app.get( "/dashboard", (_req, res) => {
	 res.sendFile(process.cwd() + "/public/dashboard.html")
      })

      // Ruta por defecto 
      this.app.get( "*", (_req, res) => {
	 res.status(404).json({msg: "Endpint not found"})
      })
   }

   private Listen(): void {
      this.app.listen(this.port, () => {
	 console.log("Server ready at:", this.port)
      })
   }
}
