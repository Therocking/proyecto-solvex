import PrismaDb from "../../../db/prismaClient";
import { Participant, PostParticipant } from "../../../interfaces/participants.interface";
import { ParticipantRepository } from "./participants.repository";


export class PostgreParticipantRepository implements ParticipantRepository {

   public async GetAllParticipants(projectId: string): Promise<Participant[]> {
       const participants = await PrismaDb.prisma.partitipant.findMany({
	  where: {project_id: projectId}
       })

       return participants
   }

   public async AddParticipant(dataForPost: PostParticipant): Promise<Participant> {
       const participant = await PrismaDb.prisma.partitipant.create({
	  data: dataForPost
       })

       return participant
   }

   public async DeleteParticipant(userId: string, projectId: string): Promise<Participant> {
       const participant = await PrismaDb.prisma.partitipant.delete({
	  where: {user_id: userId, project_id: projectId}
       })

       return participant
   }
}
