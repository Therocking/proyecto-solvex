import test, { after, before, describe } from "node:test";
import request from "supertest";
import {testServer} from "../../testServer";
import { JwtAdapter } from "../../../src/adapters/jwt.adapter";
import { envs } from "../../../src/adapters";
import { PostgreProjectRepository, PostgreUserRepository } from "../../../src/infracstructure/repositories";
import { AuthService } from "../../../src/presentation/services/auth.services";
import { ProjectsService } from "../../../src/presentation/services/projects.services";
import PrismaDb from "../../../src/db/prismaClient";

describe("Test participants routes", () => {
   before( async() => {
      testServer.Start()

      await PrismaDb.prisma.user.deleteMany()
   })

   after(() => {
      // End the server
      testServer.listenServer.close()
   })

   // User
   const jwt = new JwtAdapter(envs.JWTSEED)
   const userRepo = new PostgreUserRepository()
   const authService = new AuthService(userRepo, jwt)

   // Project
   const projectRepo = new PostgreProjectRepository()
   const projectService = new ProjectsService(projectRepo)

   // To get user and project id from the create participants request
   let userId = ""
   let token = ""
   let projectId = ""

   test("POST /participants/project/:project_id/user/:user_id - Should add the participant", async() => {
      // User
      const user = {name: "prueba11", mail: "prueba11@gmail.com", password: "1234"}
      const userResp = await authService.Register(user)
      userId = userResp.user.id
      token = userResp.token!

      // Project
      const project = {name: "project2", user_id: userId}
      const projectResp = await projectService.Create(project)
      projectId = projectResp.id

      await request(testServer.app)
	 .post(`/api/participants/project/${projectId}/user/${userId}`)
	 .set("Accept", "application/json")
	 .set("Authorization", `Bearer ${token}`)
	 .send({rol: "designer"})
	 .expect(201)
   })

   test("GET /participants/:project_id - Should get all paticipants of the project", async() => {
      await request(testServer.app)
	 .get(`/api/participants/project/${projectId}`)
	 .set("Authorization", `Bearer ${token}`)
	 .expect(200)
   })

   test("DEL /participants/project/:project_id/user/:user_id - Should delete the participant", async() =>{
      await request(testServer.app)
	 .delete(`/api/participants/project/${projectId}/user/${userId}`)
	 .set("Authorization", `Bearer ${token}`)
	 .expect(200)
   })
})
