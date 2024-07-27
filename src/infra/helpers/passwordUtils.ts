import { compare, hash } from 'bcrypt';

export async function generateHash(password: string): Promise<string> {
  const salt = 10;

  const hashedPassword = await hash(password, salt);

  return hashedPassword;
}

export async function compareHash(
  password: string,
  hash: string
): Promise<boolean> {
  return compare(password, hash);
}
