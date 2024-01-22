import { Participant, PostParticipant } from "../../../interfaces/participants.interface";


export abstract class ParticipantRepository {
   public abstract GetAllParticipants(projectId: string): Promise<Participant[]>
   public abstract AddParticipant(dataForPost: PostParticipant): Promise<Participant>
   public abstract DeleteParticipant(userId: string, projectId: string): Promise<Participant>
}
