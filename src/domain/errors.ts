import { Chat, User } from "./entities"

interface Error {
  name: string
  description: string
}

export function ExistingChatError(user1: User, user2: User): Error {
  return {
    name: "Chat already exists!",
    description: `A chat between ${user1.alias} and ${user2.alias} already exists and cannot be recreated without excluding the previous one.`
  }
}

export function TooManyMessagesError(chat: Chat): Error {
  return {
    name: "Chat cannot exceed 1000 messages!",
    description: `The chat ${chat.id} exceeded the maximum amount of messages.`
  }
}