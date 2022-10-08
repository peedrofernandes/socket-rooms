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