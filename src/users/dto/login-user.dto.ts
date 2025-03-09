import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @IsEmail()
  @ApiProperty({
    example: 'email@example.com',
    description: 'email',
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '1Sdj34zkaA',
    description: 'password',
    required: true,
  })
  password: string;
}
