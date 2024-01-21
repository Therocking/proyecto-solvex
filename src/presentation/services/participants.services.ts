import { CustomHttpErrors } from "../../helpers";
import { ParticipantRepository } from "../../infracstructure/repositories";
import { PostParticipant } from "../../interfaces";


export class ParticipantsService {
   constructor(
      private readonly repository: ParticipantRepository
   ) {}

   public async GetAll() {
      try {
	 const participants = await this.repository.GetAllParticipants()

	 return participants
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en GetAll - participants")
      }
   }

   public async Create(dataForPost: PostParticipant) {
      try {
	 const participant = await this.repository.AddParticipant(dataForPost)

	 return participant
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en C - participants")
      }
   }

   public async Delete(userId: string) {
      try {
	 const participant = await this.repository.DeleteParticipant(userId) 

	 return participant
      }catch(err) {
	 CustomHttpErrors.InternalError("Error en D - participants")
      }
   }
}
