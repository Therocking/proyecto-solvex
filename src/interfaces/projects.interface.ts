export interface Project {
   id: string
   name: string
   description?: string | null
   user_id: string
   created_at: Date
   updated_at?: Date | null
   finished_at?: Date | null
}

export interface PostProject {
   name: string
   description?: string | null
   user_id: string
}

export interface PutProject {
   id: string
   name: string
   description?: string | null
}
