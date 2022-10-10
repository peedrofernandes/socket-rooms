export type User = {
  id: string
  fullName: string
  alias: string
  email: string
  hashedPassword: string
  createdAt: Date
}

export type Chat = {
  id: string
  user1: User
  user2: User
  messages: Message[]
  createdAt: Date
}

export type Message = {
  id: string
  sender: User
  receiver: User
  chat: Chat
  sentAt: Date
  receivedAt: Date
  seenAt: Date
}

export type GlobalNetwork = {
  id: string
  totalUsers: User[]
  totalChats: Chat[]
  totalMessages: Message[]
  usersOnline: User[]
}