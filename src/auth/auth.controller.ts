import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsSignupDto } from './dto/auth-credentials-signup.dto';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsSignupDto: AuthCredentialsSignupDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsSignupDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsSignInDto: AuthCredentialsSignInDto,
  ): Promise<{ token: string }> {
    return this.authService.signIn(authCredentialsSignInDto);
  }
}
