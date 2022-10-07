import { Chat, Message, User } from "./entitites"

type create <T> = (t: T) => void
type select <T> = (id: string) => Promise<T> | T
type update <T> = (t: T) => void
type remove <T> = (t: T) => void

export interface UserRepository {
  create: create<User>
  select: select<User>
  update: update<User>
  remove: remove<User>
  selectAll: () => Promise<User[]> | User[]
  selectByEmail: (email: string) => Promise<User> | User
}

export interface ChatRepository {
  create: create<Chat>
  select: select<Chat>
  update: update<Chat>
  remove: remove<Chat>
  selectAllGivenUser: (user: User) => Chat[]
}

export interface MessageRepository {
  create: create<Message>
  select: select<Message>
  update: update<Message>
  remove: remove<Message>
  selectAllGivenChatAndOwner: (chat: Chat, owner: User) => Message[]; 
}

