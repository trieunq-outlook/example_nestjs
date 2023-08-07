import { scrypt } from 'crypto';
import { promisify } from 'util';
import 'dotenv/config';
import * as crypto from 'crypto';

const iv = Buffer.from(process.env.SECRET_IV || 'c7429fc6f0a488bb78c6cdb189dc8269', 'hex');
const algorithm = 'aes-256-cbc';
const secretKey = process.env.APP_KEY;

// scrypt is callback based so with promisify we can await it
const scryptAsync = promisify(scrypt);
/**
 * Encrypt String
 *
 * @param message string
 * @param secretKey string
 * @returns string
 */

export const encryptStr = (message: string): string => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encryptedData = cipher.update(message, 'utf-8', 'hex');
  return (encryptedData += cipher.final('hex'));
};

/**
 * Decrypt String
 *
 * @param encryptedText string
 * @param secretKey string
 * @returns string
 */

export const decryptStr = (encryptedText): string => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decryptedData = decipher.update(encryptedText, 'hex', 'utf-8');
  return (decryptedData += decipher.final('utf8'));
};

export const encryptPassword = async (password: string, salt: string) => {
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
};
