import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from '@app/db';

@Injectable()
export class UserService {
  constructor(
    // private readonly userRepository: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async getUserList() {
    // return this.userRepository.findAll();
    return 'list';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
