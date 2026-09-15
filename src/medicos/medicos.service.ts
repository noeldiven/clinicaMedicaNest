import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.medico.findMany({
      include: {
        especialidad: true,
      },
    });
  }
}