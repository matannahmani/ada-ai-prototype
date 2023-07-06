import { compare, hash } from "bcrypt"

/**
 *
 * @param password - password to be hashed
 * @returns hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, 10)
}

/**
 *
 * @param password - password to be compared
 * @param hashedPassword - hashed password to be compared
 * @returns boolean - true if password matches hashed password
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return compare(password, hashedPassword)
}
