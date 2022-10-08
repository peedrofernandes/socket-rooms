import { User } from "../domain/entitites"

export function AuthorizationError(credential: string): Error {
  return {
    name: "Authorization error",
    message: `Credential ${credential} is invalid!`,
  }
}
export function AuthenticationError(email: string) {
  return {
    name: "Invalid login error",
    message: `Invalid password or email for user ${email}!`
  }
}
export function MaximumMessagesError() {
  return {
    name: "Maximum messages error",
    message: "It is not possible to exceed a thousand messages on the same chat."
  }
}
export function ExistingChatError(user1: User, user2: User) {
  return {
    name: "Already existing chat error",
    message: `It was not possible to create a chat between ${user1} and ${user2} because it already exists!`
  }
}