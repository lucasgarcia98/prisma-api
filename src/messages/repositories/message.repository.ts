import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    const { userEmail } = createMessageDto;

    delete createMessageDto.userEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const data: Prisma.MessagesCreateInput = {
      ...createMessageDto,
      author: {
        connect: {
          email: userEmail,
        },
      },
    };

    return this.prisma.messages.create({
      data,
    });
  }

  async findAll(): Promise<MessageEntity[]> {
    return this.prisma.messages.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<MessageEntity> {
    return this.prisma.messages.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<MessageEntity> {
    const { userEmail } = updateMessageDto;

    if (!userEmail) {
      return this.prisma.messages.update({
        data: updateMessageDto,
        where: { id },
      });
    }

    delete updateMessageDto.userEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new NotFoundError('Author not found.');
    }

    const data: Prisma.MessagesUpdateInput = {
      ...updateMessageDto,
      author: {
        connect: {
          email: userEmail,
        },
      },
    };

    return this.prisma.messages.update({
      where: {
        id,
      },
      data,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<MessageEntity> {
    return this.prisma.messages.delete({
      where: {
        id,
      },
    });
  }
}
