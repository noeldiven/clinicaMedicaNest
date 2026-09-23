import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCitaDto {
  @ApiProperty({
    example: 1,
    description: 'ID del paciente',
  })
  @IsInt()
  pacienteId: number;

  @ApiProperty({
    example: 1,
    description: 'ID del médico',
  })
  @IsInt()
  medicoId: number;

  @ApiProperty({
    example: '2026-09-25T10:30:00.000Z',
    description: 'Fecha y hora de la cita',
  })
  @IsDateString()
  fechaHora: string;

  @ApiPropertyOptional({
    example: 'Dolor de cabeza y fiebre',
    description: 'Motivo de la consulta',
  })
  @IsOptional()
  @IsString()
  motivoConsulta?: string;

  @ApiPropertyOptional({
    example: 'Infección respiratoria',
    description: 'Diagnóstico realizado por el médico',
  })
  @IsOptional()
  @IsString()
  diagnostico?: string;
}