
export interface Participant {
   id: string
   rol: string
   project_id: string
   user_id: string
}

export interface GetParticipants {
   project_id: string,
   skip: number,
   limit: number
}

export interface PostParticipant {
   rol: string
   project_id: string
   user_id: string
}
