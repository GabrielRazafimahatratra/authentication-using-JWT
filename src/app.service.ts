import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Users } from './users/users.entity';
import { UUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  async getHello(userId: UUID): Promise<string> {
    const user: Users = await this.usersService.findOneUserById(userId);
    return `Hello ${user.firstName}!`;
  }
}
