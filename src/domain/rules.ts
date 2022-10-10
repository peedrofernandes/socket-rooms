import { Chat, Message, User } from "./entities"
import { ExistingChatError, TooManyMessagesError } from "./errors"
import { ChatRepository, MessageRepository, UserRepository } from "./repositories"


type VerifyUserAuthorizationRule = (params: {
  user: User
  credentials: any
  verifyAuthorizationMethod: (user: User, credentials: any) => Promise<boolean> | boolean
}) => Promise<boolean>

export const VerifyUserAuthorization: VerifyUserAuthorizationRule = async (params) => {
  const { user, credentials, verifyAuthorizationMethod } = params
  const result = await verifyAuthorizationMethod(user, credentials)
  return result
}


type ReceivePendingMessagesRule = (params: {
  user: User
  messageRepository: MessageRepository
}) => Promise<Message[]>

export const ReceivePendingMessages: ReceivePendingMessagesRule = async (params) => {
  const { user, messageRepository } = params
  const messages = await messageRepository.getPending(user)
  return messages
}


type ReceiveUserListRule = (params: {
  user: User
  userRepository: UserRepository
}) => Promise<User[]>

export const ReceiveUserList: ReceiveUserListRule = async (params) => {
  const { user, userRepository } = params
  const users = await userRepository.getUserWithoutChatList(user)
  return users
}


type ReceiveOwnChatsRule = (params: {
  user: User
  chatRepository: ChatRepository
}) => Promise<Chat[]>

export const ReceiveOwnChats: ReceiveOwnChatsRule = async (params) => {
  const { user, chatRepository } = params
  const chats = await chatRepository.getAllGivenUser(user)
  return chats
}


type VisualizePendingMessagesRule = (params: {
  user: User
  chat: Chat
  messageRepository: MessageRepository
}) => Promise<void>

export const VisualizePendingMessages: VisualizePendingMessagesRule = async (params) => {
  const { user, chat, messageRepository } = params
  await messageRepository.viewMessages(user, chat)
}


type VerifyExistingChatRule = (params: {
  user1: User
  user2: User
  chatRepository: ChatRepository
}) => Promise<void>

export const VerifyExistingChat: VerifyExistingChatRule = async (params) => {
  const { user1, user2, chatRepository } = params
  const chat = await chatRepository.verifyExistance(user1, user2)
  if (chat) throw ExistingChatError(user1, user2)
}


type NoMoreThan1000MessagesRule = (params: {
  chat: Chat
}) => Promise<void>

export const NoMoreThan1000Messages: NoMoreThan1000MessagesRule = async (params) => {
  const { chat } = params
  if (chat.messages.length > 1000)
    throw TooManyMessagesError(chat)
}


type MarkAsSentRule = (params: {
  message: Message
  messageRepository: MessageRepository
}) => Promise<void>

export const MarkAsSent: MarkAsSentRule = async (params) => {
  const { message, messageRepository } = params
  await messageRepository.updateAsSent(message)
}


type MarkAsReceivedRule = (params: {
  message: Message
  messageRepository: MessageRepository
}) => Promise<void>

export const MarkAsReceived: MarkAsReceivedRule = async (params) => {
  const { message, messageRepository } = params
  await messageRepository.updateAsReceived(message)
}
