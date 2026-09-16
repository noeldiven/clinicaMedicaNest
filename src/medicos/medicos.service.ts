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

  async findOne(id: number) {
    return this.prisma.medico.findUnique({
      where: { id },
      include: {
        especialidad: true,
      },
    });
  }

  async create(data: {
    nombre: string;
    apellidos: string;
    email: string;
    telefono?: string;
    fechaNacimiento: Date;
    especialidadId: number;
  }) {
    return this.prisma.medico.create({
      data,
      include: {
        especialidad: true,
      },
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
      especialidadId?: number;
    },
  ) {
    return this.prisma.medico.update({
      where: { id },
      data,
      include: {
        especialidad: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.medico.delete({
      where: { id },
    });
  }
}