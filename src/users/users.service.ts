import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ){}

    createUser(user: Users): Promise<Users> {
        return this.usersRepository.save(user);
    }

    updateUser(userId: UUID, userInformation: Partial<Users>): Promise<UpdateResult> {
        return this.usersRepository.update(userId, userInformation);
    }

    findOneUserByEmail(email: string): Promise<Users | null> {
        return this.usersRepository.findOneBy({email});
    }
    findOneUserById(id : UUID): Promise<Users | null> {
        return this.usersRepository.findOneBy({id});
    }

}
