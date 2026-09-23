import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CitasService } from './citas.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';

@ApiTags('Citas')
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

 @Post()
@ApiOperation({ summary: 'Crear una nueva cita' })
@ApiResponse({
  status: 201,
  description: 'Cita creada correctamente',
})
@ApiResponse({
  status: 400,
  description: 'Datos de la cita inválidos',
})
create(@Body() dto: CreateCitaDto) {
  return this.citasService.create({
    ...dto,
    fechaHora: new Date(dto.fechaHora),
  });
}

  @Get()
  @ApiOperation({ summary: 'Listar todas las citas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de citas obtenida correctamente',
  })
  findAll() {
    return this.citasService.findAll();
  }
}