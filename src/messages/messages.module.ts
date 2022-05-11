import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesRepository } from './repositories/message.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService, MessagesRepository],
})
export class MessagesModule {}
