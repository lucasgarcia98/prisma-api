import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesRepository } from './repositories/message.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly repository: MessagesRepository) {}

  create(createMessageDto: CreateMessageDto) {
    return this.repository.create(createMessageDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const post = await this.repository.findOne(id);

    if (!post) {
      throw new NotFoundError('Mensagem nao encontrada');
    }

    return post;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.repository.update(id, updateMessageDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
