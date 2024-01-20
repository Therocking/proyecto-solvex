import * as env from 'env-var';

export const envs = {
   PORT: env.get('PORT').required().asPortNumber(),
   
   //DATABASE_URL: env.get('DATABASE_URL').required().asString(),
   //POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
   //POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
   //POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
   
   //SECRETJWT: env.get('SECRETJWT').required().asString(),
}
