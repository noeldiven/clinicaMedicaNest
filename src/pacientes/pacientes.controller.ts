import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service.js';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const paciente = await this.pacientesService.findOne(Number(id));

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return paciente;
  }

  @Post()
  create(@Body() body: any) {
    return this.pacientesService.create({
      ...body,
      fechaNacimiento: new Date(body.fechaNacimiento),
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const data = {
      ...body,
      ...(body.fechaNacimiento && {
        fechaNacimiento: new Date(body.fechaNacimiento),
      }),
    };

    return this.pacientesService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(Number(id));
  }
}