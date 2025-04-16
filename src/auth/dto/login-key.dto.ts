import { ApiProperty } from '@nestjs/swagger';

export class LoginKeyDto {
  @ApiProperty({ example: '111-222-333-444' })
  key: string;
}
