import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.paciente.findMany();
  }

  async findOne(id: number) {
    return this.prisma.paciente.findUnique({
      where: { id },
    });
  }

  async create(data: {
    nombre: string;
    apellidos: string;
    email: string;
    telefono?: string;
    fechaNacimiento: Date;
  }) {
    return this.prisma.paciente.create({
      data,
    });
  }

  async update(
    id: number,
    data: {
      nombre?: string;
      apellidos?: string;
      email?: string;
      telefono?: string;
      fechaNacimiento?: Date;
    },
  ) {
    return this.prisma.paciente.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.paciente.delete({
      where: { id },
    });
  }
}