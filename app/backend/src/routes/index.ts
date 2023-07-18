import { Router } from 'express';
import teamsRouter from './teams.routes';
import authRouter from './auth.routes';
import matchRouter from './match.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', authRouter);
router.use('/matches', matchRouter)

export default router;
