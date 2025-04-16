import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LoginKeyDto } from './dto/login-key.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //tạo api đăng nhập google
  @Get('google')
  @ApiOperation({ summary: 'Redirect to Google Login' })
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  //tạo api callback google
  @Get('google/callback')
  @ApiOperation({ summary: 'Callback google' })
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const key = await this.authService.providerCallBack(
      req.user as LoginUserDto,
    );
    //chuyển hướng về client
    //res.redirect('/auth/provider/?key=' + key);
    res.redirect('http://localhost:3000/?key=' + key);
  }

  //login key
  @Get('provider')
  @ApiOperation({ summary: 'Retrun key login' })
  async provider(@Req() req: Request) {
    const key = req.query.key;
    //chuyển hướng về client
    return {
      key,
    };
  }

  //login provider vs key
  @ApiOperation({ summary: 'Login with key' })
  @Post('provider/login')
  async providerLogin(@Body() loginKeyDto: LoginKeyDto) {
    const token = await this.authService.providerLogin(loginKeyDto);
    return {
      token,
    };
  }
}
