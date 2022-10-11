import { Chat, Message, User } from "../domain/entities"
import { ChatRepository, MessageRepository, UserRepository } from "../domain/repositories"
import { MarkAsReceived, MarkAsSent, ReceiveOwnChats, ReceivePendingMessages, ReceiveUserList, VerifyExistingChat, VerifyUserAuthorization } from "../domain/rules"



type ConnectToNetworkUseCase = (params: {
  user: User
  connectionDate: Date
  authorizationParams: {
    credentials: any
    verifyAuthorizationMethod: (user: User, credentials: any) => Promise<boolean> | boolean
  }
  messageRepository: MessageRepository
  chatRepository: ChatRepository
  userRepository: UserRepository
}) => Promise<{
  chats: Chat[]
  messages: Message[]
  users: User[]
}>
export const ConnectToNetwork: ConnectToNetworkUseCase = async (params) => {
  const {
    user,
    connectionDate,
    authorizationParams,
    messageRepository,
    chatRepository,
    userRepository
  } = params

  VerifyUserAuthorization({ user, ...authorizationParams })
  const chats = await ReceiveOwnChats({ user, chatRepository })
  const messages = await ReceivePendingMessages({ user, chats, messageRepository })
  await MarkAsReceived({ data: messages, date: connectionDate, messageRepository })
  const users = await ReceiveUserList({ user, userRepository })

  return { chats, messages, users }
}



type StartChatUseCase = (params: {
  authorizationParams: {
    credentials: any
    verifyAuthorizationMethod: (user: User, credentials: any) => Promise<boolean> | boolean
  }
  starter: User
  target: User
  chatRepository: ChatRepository
}) => Promise<Chat>
export const StartChat: StartChatUseCase = async (params) => {
  const { authorizationParams, starter, target, chatRepository } = params

  await VerifyUserAuthorization({ user: starter, ...authorizationParams })
  await VerifyExistingChat({ user1: starter, user2: target, chatRepository })

  const newChat: Chat = {
    id: await chatRepository.generateId(),
    createdAt: new Date(),
    messages: new Array<Message>,
    user1: starter,
    user2: target
  }

  await chatRepository.create(newChat)
  return newChat
}



type SendMessageUseCase = (params: {
  authorizationParams: {
    credentials: any
    verifyAuthorizationMethod: (user: User, credentials: any) => Promise<boolean> | boolean
  }
  sender: User
  receiver: User
  chat: Chat
  messageRepository: MessageRepository
  chatRepository: ChatRepository
}) => Promise<void>
export const SendMessage: SendMessageUseCase = async (params) => {
  const { authorizationParams, sender, receiver, chat, messageRepository, chatRepository } = params
  await VerifyUserAuthorization({ user: sender, ...authorizationParams })

  const newMessage: Message = {
    id: await messageRepository.generateId(),
    sender,
    receiver,
    chat
  }

  await messageRepository.create(newMessage)
  await MarkAsSent({ data: newMessage, date: new Date(), messageRepository })
}