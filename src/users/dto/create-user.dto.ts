import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'Example',
    description: 'User name',
    required: true,
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'example@example.com',
    description: 'User email',
    required: true,
  })
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({
    example: '4ksKseS45',
    description: 'User password should bee min length 4',
    required: true,
    minLength: 4,
  })
  password: string;
}
