import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password) => hash(password, 12);

export const verifyPassword = async (password, hashedPassword) => compare(password, hashedPassword);
