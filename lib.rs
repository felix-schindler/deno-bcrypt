extern crate bcrypt;

use deno_bindgen::deno_bindgen;
use bcrypt::{DEFAULT_COST, hash as bcrypt_hash, verify as bcrypt_verify};

#[deno_bindgen(non_blocking)]
fn hash(password: &str) -> String {
	return bcrypt_hash(password, DEFAULT_COST).unwrap();
}

#[deno_bindgen(non_blocking)]
fn verify(password: &str, hash: &str) -> i8 {
	let result = bcrypt_verify(password, hash).unwrap();

	if result {
		return 1;
	} else {
		return 0;
	}
}
