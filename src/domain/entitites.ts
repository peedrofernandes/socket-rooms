export type User = {
  id: string
  name: string
  email: string
  hashedPassword: string
  createdAt: Date
}

export type Message = {
  id: string
  sender: User
  receiver: User
  chat: Chat
  content: string
  isSent: boolean
  isReceived: boolean
  isVisualized: boolean
}

export type Chat = {
  id: string
  user1: User
  user2: User
  messages: Message[]
  qtyMessages: number
  createdAt: Date
}