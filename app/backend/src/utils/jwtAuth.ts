import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces';

class Jwt {
  jwtSecret = process.env.JWT_SECRET || 'secret';

  sign(payload: Identifiable): string {
    return jwt.sign(payload, this.jwtSecret);
  }
}

export default Jwt;
