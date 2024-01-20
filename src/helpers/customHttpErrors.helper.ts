
export class CustomHttpErrors extends Error {
   private constructor(
      public readonly statusCode: number,
      public readonly msg: string
   ){
      super(msg)
   }

   public static BadRequest(msg:string) {
      return new CustomHttpErrors(400, msg)
   }

   public static UnAuthorize(msg:string) {
      return new CustomHttpErrors(401, msg)
   }

   public static NotFound(msg:string) {
      return new CustomHttpErrors(404, msg)
   }

   public static InternalError(msg:string) {
      return new CustomHttpErrors(500, msg)
   }
}
