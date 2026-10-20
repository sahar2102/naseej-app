import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  identifier: string; // Can be email or phone

  @MinLength(8)
  password: string;
}
