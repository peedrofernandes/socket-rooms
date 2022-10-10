import { userInfo } from "os"
import { Chat, Message, User } from "./entities"

type Create <T> = (t: T) => Promise<void> | void
type Get <T> = (id: string | number) => Promise<T> | T
type Update<T> = (t: T) => Promise<void> | void
type Remove<T> = (t: T) => Promise<void> | void 
type GenerateId = () => Promise<string> | string

export type UserRepository = {
  create: Create<User>
  get: Get<User>
  update: Update<User>
  delete: Remove<User>
  generateId: GenerateId

  getUserWithoutChatList: (user: User) => Promise<User[]> | User[]
}

export type MessageRepository = {
  create: Create<Message>
  get: Get<Message>
  update: Update<Message>
  delete: Remove<Message>
  generateId: GenerateId

  getPending: (user: User, chats: Chat[]) => Promise<Message[]> | Message[]
  viewMessages: (user: User, chat: Chat, date: Date) => Promise<Message[]> | Message[]
  updateAsSent: (data: Message | Message[], date: Date) => Promise<Message | Message[]> | Message | Message[]
  updateAsReceived: (data: Message | Message[], date: Date) => Promise<Message | Message[]> | Message | Message[]
}

export type ChatRepository = {
  create: Create<Chat>
  get: Get<Chat>
  update: Update<Chat>
  delete: Remove<Chat>
  generateId: GenerateId

  getAllGivenUser: (user: User) => Promise<Chat[]> | Chat[]
  verifyExistance: (user1: User, user2: User) => Promise<boolean> | boolean
}