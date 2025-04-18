import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async createService(data: CreateServiceDto) {
    const serviceAccount = await this.prisma.serviceAccount.create({
      data: {
        service_name: data.service_name,
        service_description: data.service_description,
        category_id: data.category_id,
        provider: data.provider,
      },
    });

    await this.prisma.servicePricing.createMany({
      data: data.items.map((item) => ({
        service_id: serviceAccount.id,
        option_name: item.name,
        price: parseInt(item.price),
        duration: parseInt(item.day),
      })),
    });
    return serviceAccount;
  }

  async getService() {
    const serviceAccount = await this.prisma.serviceAccount.findMany();
    const servicePricing = await this.prisma.servicePricing.findMany();
    const service = serviceAccount.map((service) => {
      const pricing = servicePricing.filter(
        (pricing) => pricing.service_id === service.id,
      );
      return {
        ...service,
        pricing,
      };
    });
    return service;
  }
}
