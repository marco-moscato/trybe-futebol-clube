import { Router } from 'express';
import teamsRouter from './teams.routes';
import authRouter from './auth.routes';
import matchRouter from './match.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', authRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
