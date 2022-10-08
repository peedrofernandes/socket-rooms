import { User } from "../../domain/entitites"
import { AuthenticationError, AuthorizationError } from "../errors"
import { UserRepository } from "../repositories"


type AuthorizeParams = {
  credential: string
  authorize: (credential: string) => Promise<User> | User
  renewCredentials: (credential: string) => string
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


type AuthenticateParams = {
  email: string
  password: string
  userRepository: UserRepository
  authenticate: (email: string, password: string) => Promise<boolean> | boolean
  generateCredentials: (user: User) => Promise<string> | string
}
export async function authenticate(params: AuthenticateParams) {
  const { email, password, userRepository, generateCredentials, authenticate } = params

  const user = await userRepository.selectByEmail(email)
  if (!user)
    throw AuthenticationError(email)
  let authenticationResult = await authenticate(email, password)
  if (!authenticationResult)
    throw AuthenticationError(email)
  const newCredential = generateCredentials(user)
  
  return { credential: newCredential }
}
