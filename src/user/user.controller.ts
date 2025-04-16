import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUserProfileDto } from './dto/get-profile.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppException } from 'src/common/app.exception';
import { ErrorCode, ErrorMessage } from 'src/common/error.list';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //api profile
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(['admin', 'user'])
  @Post()
  @ApiBearerAuth()
  async profile(@Body() data: GetUserProfileDto) {
    const user = await this.userService.getUserById(data.user_id);
    if (!user) {
      throw new AppException(
        ErrorCode.USER01,
        ErrorMessage.USER01,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
