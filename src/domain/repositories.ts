import { Chat, Message, User } from "./entities"

type create<T> = (t: T) => Promise<void> | void
type get<T> = (id: string | number) => Promise<T> | T
type update<T> = (t: T) => Promise<void> | void
type remove<T> = (t: T) => Promise<void> | void
type generateId<T> = () => Promise<string> | string

export type UserRepository = {
  create: create<User>
  get: get<User>
  update: update<User>
  remove: remove<User>
  generateId: generateId<User>
}

export type ChatRepository = {
  create: create<Chat>
  get: get<Chat>
  update: update<Chat>
  remove: remove<Chat>
  generateId: generateId<Chat>
}

export type MessageRepository = {
  create: create<Message>
  get: get<Message>
  update: update<Message>
  remove: remove<Message>
  generateId: generateId<Message>
}