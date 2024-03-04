import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {Strategy} from 'passport-local'
import { AuthentificationService } from "../authentification.service";
import { Users } from "src/users/users.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthentificationService){
        super({
            usernameField : 'email',
        });
    }

    async validate(email: string, password: string): Promise<Users> {
        const user = await this.authService.validateUser(email, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}