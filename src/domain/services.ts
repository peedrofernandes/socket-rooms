import { Chat, Message, User } from "./entities"

// Here it is only business logic, expressed in form of services which have tasks
// that may follow or not business rules.


type CreateChatService = (
  tasks: { createChat: (user1: User, user2: User) => Promise<Chat> | Chat },
  inputs: { user1: User, user2: User },
  ruleConditions: { chatExists: (user1: User, user2: User) => Promise<boolean> | boolean },
) => Promise<Chat | undefined>

export const CreateChat: CreateChatService = async (tasks, inputs, ruleConditions) => {
  const { createChat } = tasks
  const { user1, user2 } = inputs
  const { chatExists } = ruleConditions

  if (chatExists(user1, user2))
    return
  
  const chat = await createChat(user1, user2)

  return chat
}


type SendSystemDataService = (
  tasks: {
    setStatusToOnline: (user: User) => Promise<void> | void
    getUsersWithoutChat: (user: User) => Promise<User[]> | User[]
    markMessagesAsReceived: (user: User) => Promise<void> | void
    getChats: (user: User) => Promise<Chat[]> | Chat[]
    notifyReceivedMessages: (user: User, chats: Chat[]) => Promise<void> | void
  },
  inputs: { user: User }
) => Promise<{ users: User[], chats: Chat[] }>

export const SendSystemData: SendSystemDataService = async (tasks, inputs) => {
  const {
    setStatusToOnline,
    getUsersWithoutChat,
    markMessagesAsReceived,
    getChats,
    notifyReceivedMessages
  } = tasks
  const { user } = inputs

  await setStatusToOnline(user)
  const users = await getUsersWithoutChat(user)
  await markMessagesAsReceived(user)
  const chats = await getChats(user)
  await notifyReceivedMessages(user, chats)

  return { users, chats }
}


type SendChatDataService = (
  tasks: {
    getChat: (id: string) => Promise<Chat> | Chat
    markMessagesAsRead: (user: User, chat: Chat) => Promise<void> | void
  },
  inputs: { chatId: string, user: User },
  ruleConditions: { isUserInChat: (user: User, chat: Chat) => Promise<boolean> | boolean }
) => Promise<Chat | undefined>

export const SendChatData: SendChatDataService = async (tasks, inputs, ruleConditions) => {
  const { getChat, markMessagesAsRead } = tasks
  const { chatId, user } = inputs
  const { isUserInChat } = ruleConditions

  const chat = await getChat(chatId)
  const userInChat = await isUserInChat(user, chat)
  
  if (!userInChat)
    return
  
  await markMessagesAsRead(user, chat)

  return chat
}


type DeleteChatService = (
  tasks: { deleteChat: (chat: Chat) => Promise<void> | void },
  inputs: { chat: Chat }
) => Promise<void> | void

export const DeleteChat: DeleteChatService = async (tasks, inputs) => {
  const { deleteChat } = tasks
  const { chat } = inputs

  await deleteChat(chat)
}


type DeliverMessageService = (
  tasks: { 
    sendMessage: (sender: User, receiver: User, message: Message, chat: Chat) => Promise<void> | void
    notifyReceiver: (receiver: User, message: Message, chat: Chat) => Promise<void> | void
  },
  inputs: {
    sender: User
    receiver: User
    message: Message
    chat: Chat
  }
) => Promise<void> | void

export const DeliverMessage: DeliverMessageService = async (tasks, inputs) => {
  const { sendMessage, notifyReceiver } = tasks
  const { sender, receiver, message, chat } = inputs

  if (chat.messages.length > 1000)
    return
  
  await sendMessage(sender, receiver, message, chat)
  await notifyReceiver(receiver, message, chat)
}