import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  apellidos: string;

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe ser una fecha válida' },
  )
  fechaNacimiento: string;

  @IsInt({ message: 'La especialidad debe ser un número entero' })
  @Min(1, { message: 'La especialidad no es válida' })
  especialidadId: number;
}