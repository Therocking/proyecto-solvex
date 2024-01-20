import { envs } from "./adapters/envs.adapter";
import AppRoutes from "./presentation/routes";
import { Server } from "./presentation/server";


function main() {
   const server = new Server({
      port: envs.PORT,
      routes: AppRoutes.Routes
   })

   server.Start()
}

(() => {
   main()
})()
