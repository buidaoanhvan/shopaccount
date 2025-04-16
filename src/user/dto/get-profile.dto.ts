import { ApiProperty } from '@nestjs/swagger';

export class GetUserProfileDto {
  @ApiProperty({ example: '111-222-333-444' })
  email: string;
}
