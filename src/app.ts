import { envs } from "./adapters/envs.adapter";
import { PostgreRepository } from "./infracstructure/repository/postgre.repository";
import AppRoutes from "./presentation/routes";
import { Server } from "./presentation/server";


async function main() {
   //const repo = new PostgreRepository()
   
   const server = new Server({
      port: envs.PORT,
      routes: AppRoutes.Routes
   })

   server.Start()
}

(() => {
   main()
})()
