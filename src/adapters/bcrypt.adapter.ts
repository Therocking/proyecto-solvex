import bcrypt from 'bcryptjs';


export class BcryptAdapter {
   
   public static hash(pass: string): string {
      const salt = bcrypt.genSaltSync()
      return bcrypt.hashSync(pass, salt)
   }

   public static compare(pass: string, hash: string): boolean {
      return bcrypt.compareSync(pass, hash)
   }
}
