import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    switch (exception.code) {
      case 'P2002':
        throw new ConflictException(
          'Ya existe un registro con ese valor único',
        );

      case 'P2025':
        throw new NotFoundException('Registro no encontrado');

      default:
        throw exception;
    }
  }
}