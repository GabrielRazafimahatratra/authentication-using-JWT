import { BadRequestException, Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';

import {Public} from './decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { RegisterResponseDTO } from './dtos/register-response.dto';


@Public()
@Controller('authentification')
export class AuthentificationController {
    constructor(private authService: AuthentificationService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<LoginResponseDTO | BadRequestException> {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(
        @Body() registerBody: RegisterRequestDto,
    ): Promise<RegisterResponseDTO | BadRequestException> {
        return await this.authService.register(registerBody)
    }
}
