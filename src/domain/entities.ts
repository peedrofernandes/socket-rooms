export type User = {
  fullName: string
  alias: string
  email: string
  hashedPassword: string
  createdAt: Date
}

export type Chat = {
  user1: User
  user2: User
  messages: Message[]
  createdAt: Date
}

export type Message = {
  sender: User
  receiver: User
  chat: Chat
  sentAt: Date
  receivedAt: Date
  seenAt: Date
}

export type GlobalNetwork = {
  totalUsers: User[]
  totalChats: Chat[]
  totalMessages: Message[]
  usersOnline: User[]
}