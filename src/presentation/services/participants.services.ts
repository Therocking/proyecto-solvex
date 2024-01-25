import { DicErrors } from "../../errors/diccionaryErrors";
import { CustomHttpErrors } from "../../helpers";
import { ParticipantRepository } from "../../infracstructure/repositories";
import { GetParticipants, PostParticipant } from "../../interfaces";


export class ParticipantsService {
   constructor(
      private readonly repository: ParticipantRepository
   ) {}

   private GetPagination(total: number, dataForGet: GetParticipants) {
      const skipMinusOne = dataForGet.skip - 1

      const pagination = {
	    total,
	    skip: dataForGet.skip,
	    limit: dataForGet.limit,
	    next: `/api/participants/${dataForGet.project_id}?skip=${dataForGet.skip + 1}&limit=${dataForGet.limit}`,
	    prev: (skipMinusOne < 0)? null : `/api/participants/${dataForGet.project_id}?skip=${skipMinusOne}&limit=${dataForGet.limit}`,
      }

      return pagination
   }

   public async GetAll(dataForGet: GetParticipants) {
      try {
	 const [participants, total] = await Promise.all([
	    this.repository.GetAllParticipants(dataForGet),
	    this.repository.GetDocuments()
	 ])

	 // Pagination
	 const pagination = this.GetPagination(total, dataForGet)

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
	 // If not exist throw a 404 http error
	 if(!participant) return CustomHttpErrors.NotFound(DicErrors.PARTICIPANT_NOT_FOUND)

	 return participant
      }catch(err) {
	 throw CustomHttpErrors.InternalError(DicErrors.INTERNAL_SERVER_ERROR)
      }
   }
}
