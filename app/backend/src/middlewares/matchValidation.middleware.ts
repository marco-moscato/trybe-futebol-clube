import { NextFunction, Request, Response } from 'express';

class matchValidation {
  static validateCreation(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    if (!(homeTeamId || awayTeamId || homeTeamGoals || awayTeamGoals || inProgress)) {
      return res.status(400).json({
        message: 'A match must be informed',
      });
    }
    next();
  }
}

export default matchValidation;
