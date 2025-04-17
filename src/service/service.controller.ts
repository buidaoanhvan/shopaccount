import { Controller, Post, Req, UseGuards, Get} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @Post('create')
  async profile(@Req() req: Request) {
    await this.serviceService.createService(req.body);
    return null;
  }

  @Get('get')
  async getAll() {
    return await this.serviceService.getService();
  }
}
