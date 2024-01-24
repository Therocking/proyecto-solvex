import { DicErrors } from "../../errors/diccionaryErrors";
import { CustomHttpErrors } from "../../helpers";
import { ParticipantRepository } from "../../infracstructure/repositories";
import { GetParticipants, PostParticipant } from "../../interfaces";


export class ParticipantsService {
   constructor(
      private readonly repository: ParticipantRepository
   ) {}

   public async GetAll(dataForGet: GetParticipants) {
      try {
	 const participants = await this.repository.GetAllParticipants(dataForGet)

	 // Pagination
	 const limitMinusOne = dataForGet.limit - 1

	 const pagination = {
	    skip: dataForGet.skip,
	    limit: dataForGet.limit,
	    next: `/api/participants/${dataForGet.project_id}?skip=${dataForGet.skip}&limit=${dataForGet.limit + 1}`,
	    prev: (limitMinusOne < 1)? null : `/api/participants/${dataForGet.project_id}?skip=${dataForGet.skip}&limit=${dataForGet.limit + 1}`,
	 }

	 return {
	    pagination,
	    participants
	 }
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Create(dataForPost: PostParticipant) {
      try {
	 const participant = await this.repository.AddParticipant(dataForPost)

	 return participant
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }

   public async Delete(userId: string, projectId: string) {
      try {
	 const participant = await this.repository.DeleteParticipant(userId, projectId) 
	 if(!participant) return CustomHttpErrors.NotFound(DicErrors.PARTICIPANT_NOT_FOUND)

	 return participant
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }
}
