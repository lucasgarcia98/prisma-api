import { Messages } from '@prisma/client';

export class MessageEntity implements Messages {
  id: number;
  message: string;
  userId: number;
}
