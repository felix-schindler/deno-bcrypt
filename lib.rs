extern crate bcrypt;

use bcrypt::{hash as bcrypt_hash, verify as bcrypt_verify};
use deno_bindgen::deno_bindgen;

#[deno_bindgen(non_blocking)]
fn hash(password: &str, cost: u32) -> String {
    bcrypt_hash(password, cost).unwrap()
}

#[deno_bindgen(non_blocking)]
fn verify(password: &str, hash: &str) -> i8 {
    let result = bcrypt_verify(password, hash).unwrap();
    result as i8
}

#[no_mangle]
pub extern "C" fn free_hash(ptr: *mut u8) {
    if ptr.is_null() {
        return;
    }
    unsafe {
        let data_len = u32::from_be_bytes(*(ptr as *const [u8; 4])) as usize;
        let total = data_len + 4;
        let _ = Vec::from_raw_parts(ptr, total, total);
    }
}
