import { BadRequestException, Injectable } from '@nestjs/common';
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
  fechaNacimiento: string;
}) {
  const fechaNacimiento = new Date(data.fechaNacimiento);

  if (fechaNacimiento > new Date()) {
    throw new BadRequestException(
      'La fecha de nacimiento no puede ser futura',
    );
  }

  return this.prisma.paciente.create({
    data: {
      ...data,
      fechaNacimiento,
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
    fechaNacimiento?: string;
  },
) {
  const updateData = {
    ...data,
    ...(data.fechaNacimiento && {
      fechaNacimiento: new Date(data.fechaNacimiento),
    }),
  };

  if (
    data.fechaNacimiento &&
    new Date(data.fechaNacimiento) > new Date()
  ) {
    throw new BadRequestException(
      'La fecha de nacimiento no puede ser futura',
    );
  }

  return this.prisma.paciente.update({
    where: { id },
    data: updateData,
  });
}

  async remove(id: number) {
    return this.prisma.paciente.delete({
      where: { id },
    });
  }
}