import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePacienteDto {
  @ApiProperty({
    example: 'Ana',
    description: 'Nombre del paciente',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({
    example: 'García López',
    description: 'Apellidos del paciente',
  })
  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  apellidos: string;

  @ApiProperty({
    example: 'ana@mail.com',
    description: 'Correo electrónico del paciente',
  })
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email: string;

  @ApiPropertyOptional({
    example: '987654321',
    description: 'Número telefónico del paciente',
  })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Fecha de nacimiento del paciente',
  })
  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe ser una fecha válida' },
  )
  fechaNacimiento: string;
}