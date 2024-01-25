import { GetParticipants, Participant, PostParticipant } from "../../../interfaces/participants.interface";


export abstract class ParticipantRepository {
   public abstract GetDocuments(): Promise<number>
   public abstract GetAllParticipants(dataForGet: GetParticipants): Promise<Participant[]>
   public abstract AddParticipant(dataForPost: PostParticipant): Promise<Participant>
   public abstract DeleteParticipant(userId: string, projectId: string): Promise<Participant>
}
