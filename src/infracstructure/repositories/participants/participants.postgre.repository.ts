import PrismaDb from "../../../db/prismaClient";
import { Participant, PostParticipant } from "../../../interfaces/participants.interface";
import { ParticipantRepository } from "./participants.repository";


export class PostgreParticipantRepository implements ParticipantRepository {

   public async GetAllParticipants(): Promise<Participant[]> {
       const participants = await PrismaDb.prisma.partitipant.findMany()

       return participants
   }

   public async AddParticipant(dataForPost: PostParticipant): Promise<Participant> {
       const participant = await PrismaDb.prisma.partitipant.create({
	  data: dataForPost
       })

       return participant
   }

   public async DeleteParticipant(userId: string): Promise<Participant> {
       const participant = await PrismaDb.prisma.partitipant.delete({
	  where: {user_id: userId}
       })

       return participant
   }
}
