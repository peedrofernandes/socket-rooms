import { Chat, Message, User } from "../domain/entitites"

type Create <T> = (t: T) => Promise<void> | void
type Select <T> = (id: string) => Promise<T> | T
type Update <T> = (t: T) => Promise<void> | void
type Remove <T> = (t: T) => Promise<void> | void
type GenerateId = () => Promise<string> | string

export interface UserRepository {
  create: Create<User>
  select: Select<User>
  update: Update<User>
  remove: Remove<User>
  generateId: GenerateId

  selectAll: () => Promise<User[]> | User[]
  selectByEmail: (email: string) => Promise<User> | User
  selectWithoutChat: (user: User) => Promise<User> | User
}

export interface ChatRepository {
  create: Create<Chat>
  select: Select<Chat>
  update: Update<Chat>
  remove: Remove<Chat>
  generateId: GenerateId

  selectAllGivenUser: (user: User) => Promise<Chat[]> | Chat[]
  searchForExistingChat: (user1: User, user2: User) => Promise<Chat> | Chat
}

export interface MessageRepository {
  create: Create<Message>
  select: Select<Message>
  update: Update<Message>
  remove: Remove<Message>
  generateId: GenerateId

  selectAllGivenChatAndOwner: (chat: Chat, owner: User) => Message[]; 
  setAsReceived: (chat: Chat, receiver: User) => Promise<void> | void
  setAsViewed: (chat: Chat, viewer: User) => Promise<void> | void
}

