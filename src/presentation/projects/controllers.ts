import { Request, Response } from "express";
import { ProjectsService } from "../services/projects.services";
import { CustomHandleError } from "../../helpers";


export class ProjectsController {
   constructor(
      private readonly service: ProjectsService
   ) {}

   public GetOne = (req: Request, res: Response) => {
      const projectId = req.params.id

      this.service.GetOne(projectId)
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public GetAll = (req: Request, res: Response) => {
      const {skip=0, limit=5} = req.query
      const userId = req.body.user.id

      const skipToNumber = Number(skip)
      const limitToNumber = Number(limit)

      this.service.GetAll({skip: skipToNumber, limit: limitToNumber, user_id: userId})
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Create = (req: Request, res: Response) => {
      const name = req.body.name
      const userId = req.body.user.id

      this.service.Create({name, user_id: userId})
	 .then(resp => res.status(201).json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Update = (req: Request, res: Response) => {
      const id = req.params.id

      this.service.Update({...req.body, id})
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }

   public Delete = (req: Request, res: Response) => {
      const id = req.params.id

      this.service.Delete(id)
	 .then(resp => res.json(resp))
	 .catch(err => CustomHandleError.HandleError(err, res))
   }
}
