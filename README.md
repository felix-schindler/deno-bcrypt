# Bcrypt for Deno

Bcrypt hashing library for [Deno](https://deno.land). It uses rust
[bcrypt](https://crates.io/crates/bcrypt) via
[Deno FFI](https://deno.land/manual@v1.30.0/runtime/ffi_api) which requires Deno
v1.30.0 or higher.

## Benchmarks

Benchmark measures performance against [x/bcrypt](https://deno.land/x/bcrypt).
See [`benchmarks`](./src/all.bench.ts) for more details.

```
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
runtime: deno 1.36.0 (x86_64-apple-darwin)

file://[redacted]/deno-bcrypt/all.bench.ts
benchmark       time (avg)        iter/s             (min … max)       p75       p99      p995
---------------------------------------------------------------- -----------------------------


bcrypt ffi     214.44 ms/iter           4.7  (210.27 ms … 223.3 ms) 220.28 ms  223.3 ms  223.3 ms
bcrypt          91.36 ms/iter          10.9  (88.61 ms … 113.89 ms)  89.94 ms 113.89 ms 113.89 ms

summary
  bcrypt ffi
   2.35x slower than bcrypt

bcrypt ffi      55.32 ms/iter          18.1   (53.52 ms … 59.28 ms)  56.47 ms  59.28 ms  59.28 ms
bcrypt           90.1 ms/iter          11.1    (87.63 ms … 96.2 ms)  90.75 ms   96.2 ms   96.2 ms

summary
  bcrypt ffi
   1.63x faster than bcrypt
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

## Examples

In the [`example`](./example.ts) you can find some usage examples.
