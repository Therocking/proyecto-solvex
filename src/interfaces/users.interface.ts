export interface User {
   id: string
   name: string
   mail: string
   password: string
   created_at?: Date | null
}

export interface GetUser {
   name: string,
   skip: number,
   limit: number
}

export interface PostUser {
   name: string
   mail: string
   password: string
}

export interface PutUser {
   id: string
   name: string
   password?: string 
}
