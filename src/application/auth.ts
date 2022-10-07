import { User } from "../domain/entitites"
import { UserRepository } from "../domain/repositories"

export type AuthorizeParams = {
  credential: string
  authorize: (credential: string) => Promise<User> | User
  renewCredentials: (credential: string) => string
}

export type AuthenticateParams = {
  email: string
  password: string
  userRepository: UserRepository
  authenticate: (email: string, password: string) => Promise<boolean> | boolean
  generateCredentials: (user: User) => Promise<string> | string
}

function AuthorizationError(credential: string): Error {
  return {
    name: "Authorization error",
    message: `Credential ${credential} is invalid!`,
  }
}

function InvalidLoginError(email: string) {
  return {
    name: "Invalid login error",
    message: `Invalid password or email for user ${email}!`
  }
}

export async function authorize(params: AuthorizeParams) {
  const { credential, authorize, renewCredentials } = params;

  let authorizeResult = await authorize(credential)
  if (!authorizeResult)
    throw AuthorizationError(credential)

  return {
    user: authorizeResult,
    newCredentials: renewCredentials(credential)
  };
}

export async function authenticate(params: AuthenticateParams) {
  const { email, password, userRepository, generateCredentials, authenticate } = params

  const user = await userRepository.selectByEmail(email)
  if (!user)
    throw InvalidLoginError(email)
  let authenticationResult = await authenticate(email, password)
  if (!authenticationResult)
    throw InvalidLoginError(email)
  const newCredential = generateCredentials(user)
  
  return { credential: newCredential }
}
