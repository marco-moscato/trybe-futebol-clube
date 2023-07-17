import { JwtPayload } from 'jsonwebtoken';
import { Identifiable } from '.';

export interface ITokenCreator {
  sign(payload: Identifiable): string;
  verify(token: string): JwtPayload;
}
