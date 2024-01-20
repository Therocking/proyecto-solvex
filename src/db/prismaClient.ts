import { PrismaClient } from "@prisma/client";

class PrismaDb {
   public static prisma = new PrismaClient()

   public static DisconnectDb(): void {
      this.prisma.$disconnect()
   }
}

export default PrismaDb
