import { Participant, PostParticipant } from "../../../interfaces/participants.interface";


export abstract class ParticipantRepository {
   public abstract GetAllParticipants(): Promise<Participant[]>
   public abstract AddParticipant(dataForPost: PostParticipant): Promise<Participant>
   public abstract DeleteParticipant(userId: string): Promise<Participant>
}
