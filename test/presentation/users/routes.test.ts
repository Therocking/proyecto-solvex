import test, { after, before, describe } from "node:test";
import request from "supertest";
import {testServer} from "../../testServer"
import { PostgreUserRepository } from "../../../src/infracstructure/repositories";
import { AuthService } from "../../../src/presentation/services/auth.services";
import { JwtAdapter } from "../../../src/adapters/jwt.adapter";
import { envs } from "../../../src/adapters";
import PrismaDb from "../../../src/db/prismaClient";


describe("Tests users routes", () => {
   before( async() => {
      testServer.Start()

      await PrismaDb.prisma.user.deleteMany()
   })

   after(() => {
      testServer.listenServer.close()
   })

   // Arrange
   const jwt = new JwtAdapter(envs.JWTSEED)
   const repository = new PostgreUserRepository()
   const service = new AuthService(repository, jwt)


   test("GET /users - Should return all users", async() => {
   // Act
   const userToInsert = {name: "prueba 2", mail: "prueba2@gmail.com", password: "1234"}
   const resp = await service.Register(userToInsert)

      // Assert
     await request(testServer.app)
	 .get("/api/users")
	 .set("Authorization", `Bearer ${resp.token}`)
	 .expect(200)
   })

   test("GET /users/:id", async() => {
   // Act
   const userToInsert = {name: "prueba 4", mail: "prueba4@gmail.com", password: "1234"}
   const resp = await service.Register(userToInsert)

     await request(testServer.app)
	 .get(`/api/users/${resp.user.id}`)
	 .set("Authorization", `Bearer ${resp.token}`)
	 .expect(200)
   })

   test("PUT /users/:id", async() => {
   // Act
   const userToInsert = {name: "prueba 3", mail: "prueba3@gmail.com", password: "1234"}
   const resp = await service.Register(userToInsert)


      await request(testServer.app)
	 .put(`/api/users/${resp.user.id}`)
	 .set("Accept", "application/json")
	 .set("Authorization", `Bearer ${resp.token}`)
	 .send({name: "prueba updated"})
	 .expect(200)
   })

   test("DELETE /users/:id", async() => {
   // Act
   const userToInsert = {name: "prueba 5", mail: "prueba5@gmail.com", password: "1234"}
   const resp = await service.Register(userToInsert)


      await request(testServer.app)
	 .delete(`/api/users/${resp.user.id}`)
	 .set("Authorization", `Bearer ${resp.token}`)
	 .expect(200)
   })

      testServer.listenServer.close()
})

