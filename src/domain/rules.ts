import { Message, User } from "./entities"


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


// type ReceiveEveryMessageRule = (params: {
//   user: User
//   messageRepository: MessageRepository
// }) => Promise<Message[]>

// export const ReceiveEveryMessage: ReceiveEveryMessageRule = async (params) => {
//   const { user, messageRepository } = params

// }