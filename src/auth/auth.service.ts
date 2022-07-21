import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsSignupDto } from './dto/auth-credentials-signup.dto';
import * as bycrypt from 'bcrypt';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsSignupDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // hash the password
    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsSignInDto,
  ): Promise<{ token: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await bycrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ username });
    return { token };
  }
}
