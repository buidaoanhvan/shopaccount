import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async createService(data: any) {
    const serviceAccount = await this.prisma.serviceAccount.create({
      data: {
        service_name: data.service_name as string,
        service_description: data.service_description as string,
        category_id: data.category_id as string,
        provider: data.provider as string,
      },
    });
    data.items.map(async (item) => {
      await this.prisma.servicePricing.create({
        data: {
          service_id: serviceAccount.id,
          option_name: item.name,
          price: parseInt(item.price),
          duration: parseInt(item.day),
        },
      });
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
