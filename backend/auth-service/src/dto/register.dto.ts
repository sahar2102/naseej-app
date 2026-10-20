import { IsEmail, IsNotEmpty, IsEnum, Matches, MinLength } from 'class-validator';

export enum UserRole {
  CITIZEN = 'citizen',
  STUDENT = 'student',
  PROVIDER = 'provider',
  DRIVER = 'driver',
  ADMIN = 'admin',
}

export class RegisterDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  // Tunisian Phone Validation: +216 followed by 8 digits
  @Matches(/^\+216[0-9]{8}$/, {
    message: 'Phone number must be in Tunisian format (+216XXXXXXXX)',
  })
  phone: string;

  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
