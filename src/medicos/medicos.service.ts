import { BadRequestException, Injectable } from '@nestjs/common';
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
  fechaNacimiento: string;
  especialidadId: number;
}) {
  const fechaNacimiento = new Date(data.fechaNacimiento);

  if (fechaNacimiento > new Date()) {
    throw new BadRequestException(
      'La fecha de nacimiento no puede ser futura',
    );
  }

  return this.prisma.medico.create({
    data: {
      ...data,
      fechaNacimiento,
    },
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
    fechaNacimiento?: string;
    especialidadId?: number;
  },
) {
  if (
    data.fechaNacimiento &&
    new Date(data.fechaNacimiento) > new Date()
  ) {
    throw new BadRequestException(
      'La fecha de nacimiento no puede ser futura',
    );
  }

  const updateData = {
    ...data,
    ...(data.fechaNacimiento && {
      fechaNacimiento: new Date(data.fechaNacimiento),
    }),
  };

  return this.prisma.medico.update({
    where: { id },
    data: updateData,
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