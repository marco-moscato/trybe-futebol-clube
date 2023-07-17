import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces';
import { ITokenCreator } from '../Interfaces/ITokenCreator';

class Jwt implements ITokenCreator {
  jwtSecret = process.env.JWT_SECRET || 'secret';

  public sign(payload: Identifiable): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  public verify(token: string): jwt.JwtPayload {
    const decoded = jwt.verify(token, this.jwtSecret);
    return decoded as jwt.JwtPayload;
  }
}

export default Jwt;
