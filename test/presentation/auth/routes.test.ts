import { deepEqual, strictEqual } from "node:assert";
import test, { after, before, describe } from "node:test";
import request from "supertest"
import { testServer } from "../../testServer";
import PrismaDb from "../../../src/db/prismaClient";

describe("Test auth routes", () => {
   before( async() => {
      testServer.Start()

      await PrismaDb.prisma.user.deleteMany()
   })

   after(() => {
      testServer.listenServer.close()
   })

   // Arrange
   const userToInsert = {
      name: "test",
      mail: "test@gmail.com",
      password: "1234"
   }

   test("POST /auth/register - Should create a user", async() => {
      // Act
      const {body} = await request(testServer.app)
	 .post("/api/auth/register")
	 .set("Accept", "application/json")
	 .send(userToInsert)
	 .expect(201)

      const {user} = body

      // Assert
      deepEqual(user.name, userToInsert.name)
   })

   test("POST /auth/login - Should login a user", async() => {
      const {body} = await request(testServer.app)
	 .post("/api/auth/login")
	 .set("Accept", "application/json")
	 .send(userToInsert)
	 .expect(200)

      const {user} = body
      
      strictEqual(user.name, userToInsert.name)
   })
})
