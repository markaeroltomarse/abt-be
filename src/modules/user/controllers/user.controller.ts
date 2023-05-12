import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { LoginInput } from '../dto/input/login.input';
import { GenericResponse } from '@common/auth/decorators/generic-response.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @GenericResponse()
  async login(@Body() loginInput: LoginInput) {
    const response = await this.userService.login(loginInput);

    return {
      data: response,
    };
  }

  @Post('')
  @GenericResponse()
  async create(@Body() loginInput: LoginInput) {
    const response = await this.userService.create(loginInput);

    return {
      data: response,
    };
  }
}
