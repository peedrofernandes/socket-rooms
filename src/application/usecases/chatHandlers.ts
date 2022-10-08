import { Chat, User } from "../../domain/entitites"
import { ExistingChatError } from "../errors"
import { ChatRepository, UserRepository } from "../repositories"

type StartChatParams = {
  starterUser: User
  targetUser: User
  chatRepository: ChatRepository
}
export async function startChat(params: StartChatParams) {
  const { starterUser, targetUser, chatRepository } = params

  const existingChat = await chatRepository.searchForExistingChat(starterUser, targetUser)
  if (existingChat)
    throw ExistingChatError(starterUser, targetUser)

  const chat: Chat = {
    id: await chatRepository.generateId(),
    user1: starterUser,
    user2: targetUser,
    messages: new Array(),
    createdAt: new Date(),
    qtyMessages: 0
  }

  await chatRepository.create(chat)

  return chat
}


type GetChatsParams = {
  user: User
  chatRepository: ChatRepository
}
export async function getChats(params: GetChatsParams) {
  const { user, chatRepository } = params
  const chats = await chatRepository.selectAllGivenUser(user)
  return chats
}


type GetNonChatUsersParams = {
  user: User
  userRepository: UserRepository
}
export async function getNonChatUsers(params: GetNonChatUsersParams) {
  const { user, userRepository } = params
  const users = await userRepository.selectWithoutChat(user)
  return users
}
