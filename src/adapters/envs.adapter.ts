import * as env from 'env-var';

export const envs = {
   PORT: env.get('PORT').required().asPortNumber(),
   JWTSEED: env.get('JWTSEED').required().asString()
}
