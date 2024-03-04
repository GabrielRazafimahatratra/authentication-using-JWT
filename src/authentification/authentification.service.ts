import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/users.entity';
import {AccessToken} from './types/AccessToken';
import { RegisterRequestDto } from './dtos/register-request.dto';

@Injectable()
export class AuthentificationService {
    constructor(
        private usersService : UsersService,
        private jwtService: JwtService,
    ){}

    async validateUser(email: string, password: string): Promise<Users> {
        const user: Users = await this.usersService.findOneUserByEmail(email);
        if(!user) {
            throw new BadRequestException('Utilisateur non trouvé');
        }
        const estTrouve: boolean = bcrypt.compareSync(password, user.password);
        if (!estTrouve) {
            throw new BadRequestException('Mot de passe non existant');
        }
        return user;
    }

    async login(user: Users): Promise<AccessToken> {
        const payload = {email: user.email, id:user.id};
        return {access_token : this.jwtService.sign(payload)};
    }

    async register(user: RegisterRequestDto): Promise<AccessToken> {
        const utilisateurExistant = this.usersService.findOneUserByEmail(user.email);
        if (utilisateurExistant) {
            throw new BadRequestException('Email déjà existant');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const nouveauUtilisateur: Users = { ...user, password: hashedPassword};
        await this.usersService.createUser(nouveauUtilisateur);
        return this.login(nouveauUtilisateur);
    }

    
}
