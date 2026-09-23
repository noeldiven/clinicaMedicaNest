import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { MedicosService } from './medicos.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('Médicos')
@ApiBearerAuth()
@Controller('medicos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los médicos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de médicos obtenida correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos para acceder',
  })
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un médico por ID' })
  @ApiResponse({ status: 200, description: 'Médico encontrado' })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos para acceder',
  })
  @ApiResponse({ status: 404, description: 'Médico no encontrado' })
  async findOne(@Param('id') id: string) {
    const medico = await this.medicosService.findOne(Number(id));

    if (!medico) {
      throw new NotFoundException('Médico no encontrado');
    }

    return medico;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo médico' })
  @ApiResponse({ status: 201, description: 'Médico creado correctamente' })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos para acceder',
  })
  create(@Body() dto: CreateMedicoDto) {
    return this.medicosService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un médico' })
  @ApiResponse({ status: 200, description: 'Médico actualizado correctamente' })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos para acceder',
  })
  @ApiResponse({ status: 404, description: 'Médico no encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateMedicoDto) {
    return this.medicosService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un médico' })
  @ApiResponse({ status: 200, description: 'Médico eliminado correctamente' })
  @ApiResponse({
    status: 401,
    description: 'Token no proporcionado o inválido',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos para acceder',
  })
  @ApiResponse({ status: 404, description: 'Médico no encontrado' })
  remove(@Param('id') id: string) {
    return this.medicosService.remove(Number(id));
  }
}