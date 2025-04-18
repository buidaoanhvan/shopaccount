import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { ServiceService } from './service.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(['admin'])
  @ApiBearerAuth()
  @Post('create')
  async profile(@Body() createService: CreateServiceDto) {
    await this.serviceService.createService(createService);
    return null;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get('get')
  @Roles(['admin'])
  @ApiBearerAuth()
  async getAll() {
    return await this.serviceService.getService();
  }
}
