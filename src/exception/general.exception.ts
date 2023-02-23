import { HttpException, HttpStatus } from '@nestjs/common';

const GeneralException = {
  GENERAL_INTERNAL_SERVER: new HttpException(
    {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'GEN500',
      message: 'Internal Server Error',
      data: null,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),
  GENERAL_BAD_REQUEST: new HttpException(
    {
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode: 'GEN400',
      message: 'Bad Request',
      data: null,
    },
    HttpStatus.BAD_REQUEST,
  ),
  GENERAL_TOO_MANY_REQUEST: new HttpException(
    {
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      errorCode: 'GEN429',
      message: 'Too Many Request',
      data: null,
    },
    HttpStatus.TOO_MANY_REQUESTS,
  ),
};

export default GeneralException;
