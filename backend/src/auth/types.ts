export class JwtPayload {
  sub: string;
  username: string;
  role: string;
}

export class AuthenticatedUser {
  userId: string;
  username: string;
  role: string;
}
