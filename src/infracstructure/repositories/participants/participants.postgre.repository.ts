import PrismaDb from "../../../db/prismaClient";
import { GetParticipants, Participant, PostParticipant } from "../../../interfaces/participants.interface";
import { ParticipantRepository } from "./participants.repository";


export class PostgreParticipantRepository implements ParticipantRepository {

   public async GetDocuments(): Promise<number> {
       const total = await PrismaDb.prisma.partitipant.count()

       return total
   }

   public async GetParticipantById(id: string): Promise<Participant | null> {
      const participant = await PrismaDb.prisma.partitipant.findFirst({
	 where: {user_id: id}
      })

      return participant
   }

   public async GetAllParticipants(dataForGet: GetParticipants): Promise<Participant[]> {
       const participants = await PrismaDb.prisma.partitipant.findMany({
	  where: { /*To filter by project_id and the name of project*/
	     project_id: dataForGet.project_id
	  },
	  skip: dataForGet.skip, /*To skip a certein number of results*/
	  take: dataForGet.limit, /*To limit a certein number of results*/
	  orderBy: {rol: "asc"} /*To order by rol ascendant*/
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
