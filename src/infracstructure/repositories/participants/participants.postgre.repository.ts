import PrismaDb from "../../../db/prismaClient";
import { GetParticipants, Participant, PostParticipant } from "../../../interfaces/participants.interface";
import { ParticipantRepository } from "./participants.repository";


export class PostgreParticipantRepository implements ParticipantRepository {

   public async GetAllParticipants(dataForGet: GetParticipants): Promise<Participant[]> {
       const participants = await PrismaDb.prisma.partitipant.findMany({
	  where: {project_id: dataForGet.project_id},
	  skip: dataForGet.skip,
	  take: dataForGet.limit,
	  orderBy: {rol: "asc"}
       })

       return participants
   }

   public async AddParticipant(dataForPost: PostParticipant): Promise<Participant> {
       const participant = await PrismaDb.prisma.partitipant.create({
	  data: {
	     rol: dataForPost.rol,
	     user_id: dataForPost.user_id,
	     project_id: dataForPost.project_id
	  } 
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
