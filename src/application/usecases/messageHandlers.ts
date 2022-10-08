import { Chat, Message, User } from "../../domain/entitites"
import { MessageRepository } from "../repositories"


type SendMessageParams = {
  messageAttributes: {
    sender: User
    receiver: User
    chat: Chat
    content: string
  }
  messageRepository: MessageRepository
}
async function sendMessage(params: SendMessageParams) {
  const { messageAttributes, messageRepository } = params
  const message: Message = {
    id: await messageRepository.generateId(),
    ...messageAttributes,
    isSent: true,
    isReceived: false,
    isVisualized: false
  }
  await messageRepository.create(message)
  return true
}


type ReceiveAllMessagesParams = {
  chat: Chat
  receiver: User
  messageRepository: MessageRepository
}
async function receiveAllMessages(params: ReceiveAllMessagesParams) {
  const { chat, receiver, messageRepository } = params
  await messageRepository.setAsReceived(chat, receiver)
  return true
}


type ViewMessagesParams = {
  chat: Chat
  viewer: User
  messageRepository: MessageRepository
}
async function viewMessages(params: ViewMessagesParams) {
  const { chat, viewer, messageRepository } = params
  await messageRepository.setAsViewed(chat, viewer)
  return true
}


export default {
  sendMessage,
  receiveAllMessages,
  viewMessages
}