import * as internal from "./bindings/bindings.ts";

/**
 * @param password Clear text password
 * @param cost Hashing cost factor (default: 12)
 * @returns The hashed password
 */
export async function hash(password: string, cost = 12): Promise<string> {
	return await internal.hash(password, cost);
}

/**
 * @param password Clear text password
 * @param hash Hashed password
 * @returns Whether the password matches the hash
 */
export async function verify(password: string, hash: string): Promise<boolean> {
	return (await internal.verify(password, hash) === 1);
}
