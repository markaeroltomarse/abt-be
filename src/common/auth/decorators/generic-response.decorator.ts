import { UseInterceptors } from '@nestjs/common';
import { TransformResponse } from '../interceptors/transform-response.interceptors';

export function GenericResponse() {
  return UseInterceptors(new TransformResponse());
}
