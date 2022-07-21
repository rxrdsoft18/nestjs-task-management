import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsSignInDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
