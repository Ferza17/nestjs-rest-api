import { Contains, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  // From Header
  RequestID: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Contains('@')
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
