import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.authRepository.findOne({
      where: { username: payload.username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // constructor() {
  //   super(
  //     {
  //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //       ignoreExpiration: false,
  //       secretOrKey: process.env.JWT_SECRET,
  //     },
  //     async (payload, done) => {
  //       const user = await User.findOne({ username: payload.username });
  //       if (!user) {
  //         return done(new UnauthorizedException(), false);
  //       }
  //       done(null, user);
  //     },
  //   );
  // }
}
