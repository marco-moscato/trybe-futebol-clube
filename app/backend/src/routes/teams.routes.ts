import { Request, Response, Router } from 'express';
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';
import TeamModel from '../models/team.model';

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.getAllTeams(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => teamController.getTeamById(req, res),
);

export default router;
