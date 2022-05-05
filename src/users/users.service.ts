import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundError('Usuario nao encontrado');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.update(id, updateUserDto);

    if (!user) {
      throw new NotFoundError('Usuario nao encontrado');
    }

    return user;
  }

  async remove(id: number) {
    const user = await this.repository.remove(id);

    if (!user) {
      throw new NotFoundError('Usuario nao encontrado');
    }

    return user;
  }
}
