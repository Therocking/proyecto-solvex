import { Server } from "../src/presentation/server";
import AppRoutes  from "../src/presentation/routes";
import { envs } from "../src/adapters";


export const testServer = new Server({
   routes: AppRoutes.Routes,
   port: envs.PORT
})
