# Bcrypt for Deno

Bcrypt hashing library for [Deno](https://deno.land). It uses rust
[bcrypt](https://crates.io/crates/bcrypt) via
[Deno FFI](https://deno.land/manual@v1.30.0/runtime/ffi_api) which requires Deno
v1.30.0 or higher.

## Benchmarks

Benchmark measures performance against [x/bcrypt](https://deno.land/x/bcrypt).
See [`benchmarks`](./src/all.bench.ts) for more details.

```
cpu: Apple M2 Pro
runtime: deno 1.45.5 (aarch64-apple-darwin)

file://[redacted]/deno-bcrypt/all.bench.ts
benchmark       time (avg)        iter/s             (min … max)       p75       p99      p995
---------------------------------------------------------------- -----------------------------

group hashing
bcrypt ffi     212.93 ms/iter           4.7 (211.94 ms … 215.54 ms) 213.17 ms 215.54 ms 215.54 ms
Check https://deno.land/x/bcrypt@v0.4.1/src/worker.ts
bcrypt          75.56 ms/iter          13.2   (75.18 ms … 75.98 ms) 75.77 ms 75.98 ms 75.98 ms

summary
  bcrypt ffi
   2.81x slower than bcrypt

group verifying
bcrypt ffi      53.19 ms/iter          18.8   (53.02 ms … 53.58 ms) 53.23 ms 53.58 ms 53.58 ms
bcrypt          75.78 ms/iter          13.2    (75.2 ms … 76.96 ms) 75.73 ms 76.96 ms 76.96 ms

summary
  bcrypt ffi
   1.43x faster than bcrypt
```

## API

```ts
hash(password: string): Promise<string>
verify(password: string, hash: string): Promise<boolean>
```

## Usage

```ts
import { hash, verify } from "https://deno.land/x/bcrypt_ffi/mod.ts";

const password = "password";

const hashed = await hash(password);
const isMatch = await verify(password, hashed);
console.log(hashed, isMatch);
```
