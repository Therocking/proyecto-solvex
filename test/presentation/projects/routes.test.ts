import test, { after, before, describe } from "node:test";
import { testServer } from "../../testServer";
import request from "supertest";
import PrismaDb from "../../../src/db/prismaClient";
import { JwtAdapter } from "../../../src/adapters/jwt.adapter";
import { envs } from "../../../src/adapters";
import { PostgreUserRepository } from "../../../src/infracstructure/repositories";
import { AuthService } from "../../../src/presentation/services/auth.services";


describe("Tests projects routes", () => {
   before( async() => {
      testServer.Start()

      Promise.all([
	 await PrismaDb.prisma.project.deleteMany(),
	 await PrismaDb.prisma.user.deleteMany()
      ])
   })

   after(() => {
      testServer.listenServer.close()
   })

   // Arrange
   const jwt = new JwtAdapter(envs.JWTSEED)
   const repository = new PostgreUserRepository()
   const service = new AuthService(repository, jwt)

   // To get the id of the project created and use it in other tests
   let projectId = ""

   test("POST /projects - Should create a project", async() => {
      const user = {name: "prueba6", mail: "prueba6@gmail.com", password: "1234"}
      const resp = await service.Register(user)

      // Act
      const {body} = await request(testServer.app)
	 .post("/api/projects")
	 .set("Accept", "application/json")
	 .set("Authorization", `Bearer ${resp.token}`)
	 .send({name: "project1", user_id: resp.user.id})
	 .expect(201)

      projectId = body.id
   })

   test("GET /projects - Should get all projects of the user", async() => {
      const user = {name: "prueba7", mail: "prueba7@gmail.com", password: "1234"}
      const resp = await service.Register(user)

      await request(testServer.app)
	 .get("/api/projects")
	 .set("Authorization", `Bearer ${resp.token}`)
	 .expect(200)
   })

   test("GET /projects/:id - Should get one project of the user", async() => {
      const user = {name: "prueba8", mail: "prueba8@gmail.com", password: "1234"}
      const resp = await service.Register(user)

      await request(testServer.app)
	 .get(`/api/projects/${projectId}`)
	 .set("Authorization", `Bearer ${resp.token}`)
	 .expect(200)
   })

   test("PUT /projects/:id - Should update one project of the user", async() => {
      const user = {name: "prueba9", mail: "prueba9@gmail.com", password: "1234"}
      const resp = await service.Register(user)

      await request(testServer.app)
	 .put(`/api/projects/${projectId}`)
	 .set("Accept", "application/json")
	 .set("Authorization", `Bearer ${resp.token}`)
	 .send({name: "prueba update"})
	 .expect(200)
   })

   test("DELETE /project/:id - Should delete one project of the user", async() => {
      const user = {name: "prueba10", mail: "prueba10@gmail.com", password: "1234"}
      const resp = await service.Register(user)

      await request(testServer.app)
	 .delete(`/api/projects/${projectId}`)
	 .set("Authorization", `Bearer ${resp.token}`)
	 .expect(200)
   })
})
