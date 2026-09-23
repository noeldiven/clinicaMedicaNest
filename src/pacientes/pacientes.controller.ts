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

import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';
import { PacientesService } from './pacientes.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('Pacientes')
@ApiBearerAuth()
@Controller('pacientes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los pacientes' })
  @ApiResponse({ status: 200, description: 'Lista de pacientes obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'Token no proporcionado o inválido' })
  @ApiResponse({ status: 403, description: 'No tiene permisos para acceder' })
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado' })
  @ApiResponse({ status: 401, description: 'Token no proporcionado o inválido' })
  @ApiResponse({ status: 403, description: 'No tiene permisos para acceder' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async findOne(@Param('id') id: string) {
    const paciente = await this.pacientesService.findOne(Number(id));

    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return paciente;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @ApiResponse({ status: 201, description: 'Paciente creado correctamente' })
  @ApiResponse({ status: 401, description: 'Token no proporcionado o inválido' })
  @ApiResponse({ status: 403, description: 'No tiene permisos para acceder' })
  create(@Body() dto: CreatePacienteDto) {
    return this.pacientesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un paciente' })
  @ApiResponse({ status: 200, description: 'Paciente actualizado correctamente' })
  @ApiResponse({ status: 401, description: 'Token no proporcionado o inválido' })
  @ApiResponse({ status: 403, description: 'No tiene permisos para acceder' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdatePacienteDto) {
    return this.pacientesService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un paciente' })
  @ApiResponse({ status: 200, description: 'Paciente eliminado correctamente' })
  @ApiResponse({ status: 401, description: 'Token no proporcionado o inválido' })
  @ApiResponse({ status: 403, description: 'No tiene permisos para acceder' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(Number(id));
  }
}